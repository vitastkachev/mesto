const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const page = document.querySelector('.page')
const pageNoscroll = document.querySelector('.page_noscroll')
const popupEditBtn = document.querySelector('.profile__edit-button'); //кнопка редактирования
const popupTypeEdit = document.querySelector('.popup_type_edit'); //попап редактирования
const profileName = document.querySelector('.profile__name');
const profileCharacter = document.querySelector('.profile__character');
const formEdit = document.querySelector('.popup__forms_edit'); //форма редактирования
const nameInput = formEdit.querySelector('.popup__input_name-title'); //имя
const jobInput = formEdit.querySelector('.popup__input_name-subtitle'); //работа

const buttonSave = document.querySelector('.popup__submit-button_preserve');
const buttonCreate = document.querySelector('.popup__submit-button_create');

const popupAddBtn = document.querySelector('.profile__add-button'); //кнопка добавить
const popupTypeNewCard = document.querySelector('.popup_type_new-card'); //попап создания
const formNewCard = document.querySelector('.popup__forms_new-card'); // форма попап создания
const thisNameInput = formNewCard.querySelector('.popup__input_this-name'); //имя карточки
const thisLinkInput = formNewCard.querySelector('.popup__input_this-link'); //адрес карточки

const popupCloseBtnEdit = document.querySelector('.popup__close-button_edit');
const popupCloseBtnNewCard = document.querySelector('.popup__close-button_new-card');
const popupCloseBtnImage = document.querySelector('.popup__close-button_image');
// кнопки закрытия

const popupTypeImage = document.querySelector('.popup_type_image');// попап картинки
const popupImg = popupTypeImage.querySelector('.popup__image'); //картинка
const popupText = popupTypeImage.querySelector('.popup__caption'); // подпись к картинке

const cardsContainer = document.querySelector('.gallery-cards__container');
const cardsTemplate = document.querySelector('#gallery-cards-template').content.querySelector('.gallery-cards__container');
const galleryCards = document.querySelector('.gallery-cards');

function openImagePopup (link, name)  {
  popupImg.src = link;
  popupImg.alt = name;
  popupText.textContent = name;
  openPopup(popupTypeImage);
 }

function createCard(link, name){
  const cardsContainer = cardsTemplate.cloneNode(true);
  const cardImage = cardsContainer.querySelector('.gallery-cards__image');
  const cardTitle = cardsContainer.querySelector('.gallery-cards__title');
  const cardButtonDel = cardsContainer.querySelector('.gallery-cards__delete');
  const like = cardsContainer.querySelector('.gallery-cards__like-button');
  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  like.addEventListener('click', function(){ like.classList.toggle('gallery-cards__like-button_active'); });

  cardButtonDel.addEventListener('click', function(){
    cardsContainer.remove();
   })

  cardImage.addEventListener('click', () => openImagePopup(link, name) )

 return cardsContainer;
}


function renderCard(container, data , position = 'before'){
  if (position = 'before'){
    container.prepend(createCard(data.link, data.name));
  } else if (position = 'after') {
    container.append(createCard(data.link, data.name));
  }
};


formNewCard.addEventListener('submit', (evt) => {
  evt.preventDefault();
  renderCard(galleryCards, {link: thisLinkInput.value, name: thisNameInput.value}, 'before')
  closePopup(popupTypeNewCard);
});

function createInitialCards(){
  initialCards.forEach((item) => renderCard(galleryCards, item, 'after'));
};

createInitialCards();

function openPopup(modal) {
  modal.classList.add('popup_opened');
  page.classList.add('page_noscroll');

  document.addEventListener('keydown', closeByEsc);
};

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  page.classList.remove('page_noscroll');

  document.addEventListener('keydown', closeByEsc);
};

function setPopupInputValue() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCharacter.textContent;
};

function setNodeTextValue() {
  profileName.textContent = nameInput.value;
  profileCharacter.textContent = jobInput.value;
};

function handFormEdit(evt) {
  evt.preventDefault();
  setNodeTextValue();
  closePopup(popupTypeEdit);
};

popupEditBtn.addEventListener('click', function () {
  setPopupInputValue();
  openPopup(popupTypeEdit);
  resetValidation(formEdit, selectors);
});

popupAddBtn.addEventListener('click', function () {
  formNewCard.reset();
  openPopup(popupTypeNewCard);
  resetValidation(formNewCard, selectors);
});


document.querySelectorAll('.popup').forEach( popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button-img')) {
      closePopup(popup);
    };
  });
});

formEdit.addEventListener('submit', handFormEdit);

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}




