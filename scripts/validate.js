const selectors = {
  formSelector: '.popup__forms',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_turn-off',
  inputErrorClass: 'popup__input_type_error',
};


// show error
function showError(input, inputErrorClass) {
  const error = document.querySelector(`.${input.id}-error`);

  error.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
};

// hidden error
function hiddenError(input, inputErrorClass) {
  const error = document.querySelector(`.${input.id}-error`);

  input.classList.remove(inputErrorClass);
  error.textContent = '';
};

// check input validity
function checkInputValidity(input, inputErrorClass) {
  if (!input.validity.valid) {
    showError(input, inputErrorClass);
  } else {
    hiddenError(input, inputErrorClass);
  }
};

// button submit active
function buttonSubmitActive(button, inactiveButtonClass) {
  button.disabled = false;
  button.classList.remove(inactiveButtonClass);
};

// button submit inactive
function buttonSubmitInactive(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  button.disabled = true;
};

// toggle button state
function toggleButtonState(inputList, button, inactiveButtonClass) {
  if (isValid(inputList)) {
    buttonSubmitInactive(button, inactiveButtonClass);
  } else {
    buttonSubmitActive(button, inactiveButtonClass);
  }
};

// is valid
function isValid(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};


// set event listener
function setEventListener(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);

  // form.addEventListener('submit', handlerSubmit);
  toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);

  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(input, inputErrorClass);
      toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
    });
  });
};

// enabled validation
function enableValidation({ formSelector, ...selectors }) {
 const forms = Array.from(document.querySelectorAll(formSelector));

 forms.forEach((form) => {
   setEventListener(form, selectors);
  });
};

// reset validation
function resetValidation(form, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass }) {
  const inputList = Array.from(form.querySelectorAll(inputSelector));
  const buttonSubmit = form.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);

  inputList.forEach((input) => {
    hiddenError(input, inputErrorClass);
  });
};

// handler submit
const handlerSubmit = (e) =>  {
  e.preventDefault();
};

// active validation
enableValidation(selectors);




