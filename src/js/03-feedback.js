import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formEl = document.querySelector('.feedback-form');
const inputEl = document.querySelector('.feedback-form [name="email"]');
const textareaEl = document.querySelector('.feedback-form [name="message"]');

formEl.addEventListener('input', throttle(onFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

onLoad();

function onFormInput() {
  let data = {};
  data.email = inputEl.value;
  data.message = textareaEl.value;
  let stringifyData = JSON.stringify(data);

  localStorage.setItem(STORAGE_KEY, stringifyData);
  console.log(localStorage);
}

function onFormSubmit(evt) {
  evt.preventDefault();
  localStorage.clear();
  //   inputEl.value = '';
  //   textareaEl.value = '';
  evt.target.reset();
}

function onLoad() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  const parsedSavedData = JSON.parse(savedData);

  if (savedData) {
    inputEl.value = parsedSavedData.email;
    textareaEl.value = parsedSavedData.message;
  }
}
