const imageModal1 = document.querySelector(".imageModal1");
const imageModal2 = document.querySelector(".imageModal2");
const image1 = document.querySelector("#image1");
const image2 = document.querySelector("#image2");

function showModal1() {
  imageModal1.showModal();
}

function showModal2() {
  imageModal2.showModal();
}

image1.addEventListener("click", showModal1);
image2.addEventListener("click", showModal2);

imageModal1.addEventListener("click", (closeModal) => {
  const modalDimensions = imageModal1.getBoundingClientRect();
  if (
    closeModal.clientX < modalDimensions.left ||
    closeModal.clientX > modalDimensions.right ||
    closeModal.clientY < modalDimensions.top ||
    closeModal.clientY > modalDimensions.bottom
  ) {
    imageModal1.close();
  }
});

imageModal2.addEventListener("click", (closeModal) => {
  const modalDimensions = imageModal2.getBoundingClientRect();
  if (
    closeModal.clientX < modalDimensions.left ||
    closeModal.clientX > modalDimensions.right ||
    closeModal.clientY < modalDimensions.top ||
    closeModal.clientY > modalDimensions.bottom
  ) {
    imageModal2.close();
  }
});
