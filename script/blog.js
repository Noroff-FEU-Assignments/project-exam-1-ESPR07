const articleContainer = document.querySelector(".articleContainer");
const modalContainer = document.querySelector(".modalContainer");
const clickableImage = document.querySelector(".clickableImage");

const fetchID = document.location.search;
const param = new URLSearchParams(fetchID);
const ID = param.get("id");

const baseURL = "https://sindrederaas.no/";
const URLPath = "wordpress/wp-json/wp/v2/posts/";
const fullURL = baseURL + URLPath + ID + "?_embed";

async function getPost() {
  const response = await fetch(fullURL);
  const result = await response.json();
  return result;
}

function renderHTML(result) {
  document.title = result.title.rendered;
  const featuredImage = result._embedded["wp:featuredmedia"][0].source_url;
  const featuredAlt = result._embedded["wp:featuredmedia"][0].alt_text;
  const contentText = result.content.rendered;
  const contentFormated = contentText.replace(/(<([^>]+)>)/gi, "");

  const modalImage = document.createElement("img");
  modalImage.src = featuredImage;
  modalImage.alt = featuredAlt;
  modalContainer.append(modalImage);

  const modalAlt = document.createElement("p");
  modalAlt.innerText = featuredAlt;
  modalContainer.append(modalAlt);

  const blogHeader = document.querySelector(".blogHeader");
  blogHeader.innerText = result.title.rendered;

  const blogImage = document.createElement("img");
  blogImage.classList.add("blogImage");
  blogImage.src = featuredImage;
  blogImage.alt = featuredAlt;
  clickableImage.append(blogImage);

  const blogImageAlt = document.createElement("p");
  blogImageAlt.classList.add("textAlt");
  blogImageAlt.innerText = featuredAlt;
  clickableImage.append(blogImageAlt);

  const blogText = document.createElement("p");
  blogText.innerText = new DOMParser().parseFromString(
    contentFormated,
    "text/html"
  ).body.textContent;
  blogText.classList.add("articleText");
  articleContainer.append(blogText);
}

async function createPage() {
  const APIFetch = await getPost();

  renderHTML(APIFetch);
}

createPage();

function showModal() {
  modalContainer.showModal();
}

clickableImage.addEventListener("click", showModal);

modalContainer.addEventListener("click", (closeModal) => {
  const modalDimensions = modalContainer.getBoundingClientRect();
  if (
    closeModal.clientX < modalDimensions.left ||
    closeModal.clientX > modalDimensions.right ||
    closeModal.clientY < modalDimensions.top ||
    closeModal.clientY > modalDimensions.bottom
  ) {
    modalContainer.close();
  }
});
