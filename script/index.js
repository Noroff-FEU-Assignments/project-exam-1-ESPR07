const carouselContainer = document.querySelector(".carouselCardContainer");
const leftArrowButton = document.querySelector(".carouselLeftButton");
const leftArrowIcon = document.querySelector(".leftArrowIcon");
const rightArrowButton = document.querySelector(".carouselRightButton");
const rightArrowIcon = document.querySelector(".rightArrowIcon");
leftArrowButton.disabled = true;
leftArrowButton.style.cursor = "default";
let pageCount = 1;

const baseURL = "https://sindrederaas.no/";
const URLPath = "wordpress/wp-json/wp/v2/";
const URLElements = "posts?_embed&per_page=4";
const dynamicURLParam = "&page=";

const fullAPIURL = baseURL + URLPath + URLElements + dynamicURLParam;

async function getPosts() {
  const response = await fetch(fullAPIURL + pageCount);
  const result = await response.json();
  return result;
}

function renderHTML(result) {
  result.forEach(({ id, title, _embedded, excerpt }) => {
    const featuredImage = _embedded["wp:featuredmedia"][0].source_url;
    const featuredAlt = _embedded["wp:featuredmedia"][0].alt_text;
    const textExcerpt = excerpt.rendered;
    const excerptFormat = textExcerpt.replace(/(<([^>]+)>)/gi, "");

    const cardContainer = document.createElement("a");
    cardContainer.classList.add("carouselContent");
    cardContainer.href = "/blog.html?id=" + id;
    carouselContainer.append(cardContainer);

    const cardImage = document.createElement("img");
    cardImage.src = featuredImage;
    cardImage.alt = featuredAlt;
    cardContainer.append(cardImage);

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = title.rendered;
    cardContainer.append(cardTitle);

    const cardExcerpt = document.createElement("p");
    cardExcerpt.innerText = excerptFormat;
    cardExcerpt.classList.add("subFont");
    cardContainer.append(cardExcerpt);
  });
}

async function nextPostsPage() {
  pageCount++;
  const APIFetch = await getPosts();
  if (pageCount > 1) {
    leftArrowButton.disabled = false;
    leftArrowButton.style.cursor = "pointer";
    leftArrowButton.style.backgroundImage = "url(/images/featuredArrow.svg)";
  }
  if (pageCount === 3) {
    rightArrowButton.disabled = true;
    rightArrowButton.style.cursor = "default";
    rightArrowButton.style.backgroundImage = "none";
  }
  carouselContainer.innerHTML = "";
  renderHTML(APIFetch);
}

rightArrowButton.addEventListener("click", nextPostsPage);

async function prevPostsPage() {
  pageCount--;
  const APIFetch = await getPosts();
  if (pageCount < 3) {
    rightArrowButton.disabled = false;
    rightArrowButton.style.cursor = "pointer";
    rightArrowButton.style.backgroundImage = "url(/images/featuredArrow.svg)";
  }
  if (pageCount === 1) {
    leftArrowButton.disabled = true;
    leftArrowButton.style.cursor = "default";
    leftArrowButton.style.backgroundImage = "none";
  }
  carouselContainer.innerHTML = "";
  renderHTML(APIFetch);
}

leftArrowButton.addEventListener("click", prevPostsPage);

async function createPage() {
  const APIFetch = await getPosts();

  renderHTML(APIFetch);
}

createPage();
