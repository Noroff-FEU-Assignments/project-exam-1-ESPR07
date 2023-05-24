const carouselContainer = document.querySelector(".carouselCardContainer");
const leftArrowButton = document.querySelector(".carouselLeftButton");
const leftArrowIcon = document.querySelector(".leftArrowIcon");
const rightArrowButton = document.querySelector(".carouselRightButton");
const rightArrowIcon = document.querySelector(".rightArrowIcon");
const loader = document.querySelectorAll(".indexLoader");

const baseURL = "https://sindrederaas.no/";
const URLPath = "wordpress/wp-json/wp/v2/";
const URLElements = "posts?_embed&per_page=12";
const dynamicURLParam = "&page=";

const fullAPIURL = baseURL + URLPath + URLElements;

async function getPosts() {
  const response = await fetch(fullAPIURL);
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
    cardExcerpt.innerText = new DOMParser().parseFromString(
      excerptFormat,
      "text/html"
    ).body.textContent;
    cardExcerpt.classList.add("subFont");
    cardContainer.append(cardExcerpt);
  });
}

async function nextPostsPage() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    carouselContainer.scrollTop += 355;
  } else {
    carouselContainer.scrollLeft += 760;
  }
}

rightArrowButton.addEventListener("click", nextPostsPage);

async function prevPostsPage() {
  if (window.matchMedia("(max-width: 900px)").matches) {
    carouselContainer.scrollTop += -355;
  } else {
    carouselContainer.scrollLeft += -760;
  }
}
function removeLoader() {
  loader.forEach((loader) => {
    loader.style.display = "none";
  });
}

leftArrowButton.addEventListener("click", prevPostsPage);

async function createPage() {
  const APIFetch = await getPosts();

  removeLoader();

  renderHTML(APIFetch);
}

createPage();
