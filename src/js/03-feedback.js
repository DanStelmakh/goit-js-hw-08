import storageAPI from './storage';
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
console.log(form);

initPage();
form.addEventListener('input', throttle(onInput, 500));
form.addEventListener('submit', onSubmit);

function onInput(evt) {
  const { name, value } = evt.target;

  let savedData = storageAPI.load('feedback-form-state');
  savedData = savedData ? savedData : {};
  savedData[name] = value;
  storageAPI.save('feedback-form-state', savedData);

  console.log(onInput);
}

function initPage() {
  const savedData = storageAPI.load('feedback-form-state');
  if (!savedData) {
    return;
  }
  Object.entries(savedData).forEach(([name, value]) => {
    form.elements[name].value = value;
  });
}

function onSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;

  console.log({ email: email.value, message: message.value });

  evt.currentTarget.reset();
  storageAPI.remove('feedback-form-state');
}
