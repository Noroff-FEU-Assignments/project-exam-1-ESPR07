const carouselContainer = document.querySelector(".carouselCardContainer");
const leftArrowButton = document.querySelector(".carouselLeftButton");
const leftArrowIcon = document.querySelector(".leftArrowIcon");
const rightArrowButton = document.querySelector(".carouselRightButton");
const rightArrowIcon = document.querySelector(".rightArrowIcon");
leftArrowButton.disabled = true;
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
  result.forEach(({ id, title, _embedded }) => {
    const featuredImage = _embedded["wp:featuredmedia"][0].source_url;
    const featuredAlt = _embedded["wp:featuredmedia"][0].alt_text;

    const cardContainer = document.createElement("a");
    cardContainer.classList.add("carouselContent");
    cardContainer.href = carouselContainer.append(cardContainer);

    const cardImage = document.createElement("img");
    cardImage.src = featuredImage;
    cardImage.alt = featuredAlt;
    cardContainer.append(cardImage);

    const cardTitle = document.createElement("h3");
    cardTitle.innerText = title.rendered;
    cardContainer.append(cardTitle);
  });
}

async function nextPostsPage() {
  pageCount++;
  if (pageCount > 1) {
    leftArrowButton.disabled = false;
    leftArrowIcon.style.backgroundImage = "url(/images/featuredArrow.svg)";
  }
  if (pageCount === 3) {
    rightArrowButton.disabled = true;
    rightArrowIcon.style.backgroundImage = "none";
  }
  carouselContainer.innerHTML = "";
  createPage();
}

rightArrowButton.addEventListener("click", nextPostsPage);

async function prevPostsPage() {
  pageCount--;
  if (pageCount < 3) {
    rightArrowButton.disabled = false;
    rightArrowIcon.style.backgroundImage = "url(/images/featuredArrow.svg)";
  }
  if (pageCount === 1) {
    leftArrowButton.disabled = true;
    leftArrowIcon.style.backgroundImage = "none";
  }
  carouselContainer.innerHTML = "";
  createPage();
}

leftArrowButton.addEventListener("click", prevPostsPage);

async function createPage() {
  const APIFetch = await getPosts();

  renderHTML(APIFetch);
}

createPage();
