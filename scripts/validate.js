const validSelector = {
  formSelector: '.popup__forms',
  inputSelector: '.popup__input',
  spanErrorSelector: 'popup__input-error',
  errorSelector: 'popup__input-error',
  submitButtonSelector: '.popup__submit-button',
  invalidSubmitButtonSelector: 'popup__submit-button_turn-off',
};


const clearErrorForms = (formsElement, elementsSubmit) => {
  formsElement.querySelectorAll(validSelector.inputSelector).forEach((clearinput) => {
    clearinput.classList.remove(validSelector.errorSelector);

    clearinput.removeAttribute('style');
  });
  formsElement.querySelectorAll(validSelector.spanErrorSelector).forEach((clearSpan) => {
    clearSpan.textContent = "";
  });
  elementsSubmit.classList.add(validSelector.invalidSubmitButtonSelector);
  elementsSubmit.setAttribute('disabled', 'disabled');
};

const toggleFormSubmit = (elementsSubmit, { disable }) => {
  if (disable) {
    elementsSubmit.classList.remove('popup__submit-button_turn-off') ;
    elementsSubmit.removeAttribute('disabled');
  } else {
    elementsSubmit.classList.add('popup__submit-button_turn-off');
    elementsSubmit.setAttribute('disabled', 'disabled');
  }
};


const setFieldError = (elementField, elementsError, arguments, submitButton) => {
  elementsError.textContent = arguments.validationMessage;
  if (arguments.valid) {
    // elementField.classList.remove(arguments.invalidFieldClass);   уд
    elementField.removeAttribute ('style');
  } else {
    // elementField.classList.add(arguments.invalidFieldClass) ;       уд
    elementField.setAttribute ('style',  'border-color: red');

  }
};

const checkFormValid = (elementsFields, elementsSubmit) => {
  toggleFormSubmit(elementsSubmit, { disable: true });

  const formIsValid = elementsFields.every(({ validity }) => validity.valid);
  if (!formIsValid) {
    toggleFormSubmit(elementsSubmit, { disable: false });
  }

  return formIsValid;
};

const setEventListener = (formsElement) => {
  const inputList = formsElement.querySelectorAll('.popup__input');

   inputList.forEach(inputElement => {
    inputElement.addEventListener('input', (e) => {
      checkFieldValid(inputElement, formsElement, 'popup__input-error');
    });
  });
};

const checkFieldValid = (elementField, formsElement, invalidFieldClass) => {
  const { validationMessage, validity: { valid } } = elementField;
   const submitButton = formsElement.querySelector('.popup__submit-button')
   const errorTextContainerSelector = `.popup__input-error_${elementField.name}`;
    const elementsError = formsElement.querySelector(errorTextContainerSelector);


  const arguments = {
    validationMessage,
    valid,
    invalidFieldClass,
  };

  toggleFormSubmit(submitButton, { disable: formsElement.checkValidity() });
  setFieldError(elementField, elementsError, arguments, submitButton);

  return valid ;
};

const submitCommonHandlers = (e) =>  {
  e.preventDefault();
};


function enableValidation(formSelector) {
 const forms = Array.from(document.querySelectorAll(formSelector));
 forms.forEach((formsElement) => {
    formsElement.addEventListener('submit', submitCommonHandlers);
    setEventListener(formsElement);
    checkFormValid(Array.from(formsElement.querySelectorAll('.popup__input')), formsElement.querySelector('.popup__submit-button'));
  });
};

enableValidation(validSelector.formSelector);





