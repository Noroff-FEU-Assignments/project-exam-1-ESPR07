const contentCardContainer = document.querySelector(".browseContentContainer");
const loadMoreButton = document.querySelector(".button");
const loader = document.querySelector(".browseLoader");
const searchForm = document.querySelector(".searchBar");
const searchField = document.querySelector(".searchField");
const searchButton = document.querySelector(".button");

let pageCount = 1;

const baseURL = "https://sindrederaas.no/";
const URLPath = "wordpress/wp-json/wp/v2/";
const URLElements = "posts?_embed&per_page=10";
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
    cardContainer.classList.add("contentCard");
    cardContainer.href = "/blog.html?id=" + id;
    contentCardContainer.append(cardContainer);

    const cardImage = document.createElement("img");
    cardImage.src = featuredImage;
    cardImage.alt = featuredAlt;
    cardContainer.append(cardImage);

    const cardTitle = document.createElement("h2");
    cardTitle.innerText = title.rendered;
    cardContainer.append(cardTitle);
  });
}

loadMoreButton.addEventListener("click", renderNextPage);

async function renderNextPage() {
  pageCount++;
  const APIFetch = await getPosts();
  loadMoreButton.style.display = "none";
  renderHTML(APIFetch);
}

async function updateHTML(event) {
  event.preventDefault();
  const blogFetch = await getPosts();
  const searchValue = searchField.value;
  contentCardContainer.innerText = "";
  if (searchValue != "" && searchValue != null) {
    searchButton.style.display = "none";
    const filteredAPI = blogFetch.filter(
      (blog) =>
        blog.title.rendered.toLowerCase().includes(searchValue.toLowerCase()) ||
        blog.content.rendered.toLowerCase().includes(searchValue.toLowerCase())
    );
    renderHTML(filteredAPI);
  }
}

searchForm.addEventListener("submit", updateHTML);

async function createPage() {
  const fetchAPI = await getPosts();

  loader.style.display = "none";

  renderHTML(fetchAPI);
}

createPage();
