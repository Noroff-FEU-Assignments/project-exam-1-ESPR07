const nameValue = document.querySelector("#name");
const nameError = document.querySelector("#errorName");

const emailValue = document.querySelector("#email");
const emailError = document.querySelector("#errorEmail");

const subjectValue = document.querySelector("#subject");
const subjectError = document.querySelector("#errorSubject");

const messageValue = document.querySelector("#message");
const messageError = document.querySelector("#errorMessage");

const submitButton = document.querySelector(".button");
const successModal = document.querySelector(".successModal");

submitButton.addEventListener("click", contactValidationEvent);

function letterValidator(value, compareValue) {
  return value.trim().length > compareValue;
}

function numberValidator(value, limit) {
  return value === Number && value === limit;
}

function emailCheck(email) {
  const pattern = /\S+@\S+\.\S+/;
  const patternMatch = pattern.test(email);
  return patternMatch;
}

function contactValidationEvent(event) {
  event.preventDefault();
  if (letterValidator(nameValue.value, 5)) {
    errorName.style.display = "none";
  } else {
    errorName.style.display = "block";
  }

  if (emailCheck(emailValue.value) === true) {
    emailError.style.display = "none";
  } else {
    emailError.style.display = "block";
  }

  if (letterValidator(subjectValue.value, 15)) {
    subjectError.style.display = "none";
  } else {
    subjectError.style.display = "block";
  }

  if (letterValidator(messageValue.value, 25)) {
    messageError.style.display = "none";
  } else {
    messageError.style.display = "block";
  }

  if (
    emailCheck(emailValue.value) &&
    letterValidator(nameValue.value, 5) &&
    letterValidator(subjectValue.value, 15) &&
    letterValidator(messageValue.value, 25) === true
  ) {
    nameValue.value = "";
    emailValue.value = "";
    subjectValue.value = "";
    messageValue.value = "";

    successModal.showModal();
  }
}

successModal.addEventListener("click", (closeModal) => {
  const modalDimensions = successModal.getBoundingClientRect();
  if (
    closeModal.clientX < modalDimensions.left ||
    closeModal.clientX > modalDimensions.right ||
    closeModal.clientY < modalDimensions.top ||
    closeModal.clientY > modalDimensions.bottom
  ) {
    successModal.close();
  }
});
