const popupBtn = document.querySelector(".profile__edit-button");
const popupCloseBtn = document.querySelector(".popup__close-button");
const popupEle = document.querySelector(".popup");

const profileName = document.querySelector(".profile__name");
const profileCharacter = document.querySelector(".profile__character");

const formButton = document.querySelector(".popup__button");

let formElement = document.querySelector(".popup__container");

let nameInput = formElement.querySelector(".popup__input_name");
let jobInput = formElement.querySelector(".popup__input_job");

function openPopup() {
  popupEle.classList.add("popup_opened");
}

function closePopup() {
  popupEle.classList.remove("popup_opened");
}

function ClosePopupButtonClick(evt) {
  const popupCloseBtn = evt.target;
  if (popupCloseBtn.classList.contains("popup__close-button")) {
    const currentPopup = popupCloseBtn.closest(".popup");
    closePopup(currentPopup);
  }
}

// popupBtn.addEventListener('click', openPopup);
popupCloseBtn.addEventListener("click", closePopup);

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
}

function setNodeTextValue() {
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  setNodeTextValue();
  closePopup();
}

popupBtn.addEventListener("click", function () {
  setPopupInputValue();
  openPopup();
});

formElement.addEventListener("submit", formSubmitHandler);
