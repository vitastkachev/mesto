const popupEditBtn = document.querySelector('.profile__edit-button');
const popupCloseBtn = document.querySelector('.popup__close-button');
const popupEle = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileCharacter = document.querySelector('.profile__character');

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__input_name-title');
let jobInput = formElement.querySelector('.form__input_name-subtitle');

function openPopup() {
  popupEle.classList.add('popup_opened');
}

function closePopup() {
  popupEle.classList.remove('popup_opened');
}

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

popupEditBtn.addEventListener('click', function () {
  setPopupInputValue();
  openPopup();
});
popupCloseBtn.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
