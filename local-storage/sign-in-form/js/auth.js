'use strict';

const auth = document.getElementsByClassName('sign-in-htm')[0];
const reg = document.getElementsByClassName('sign-up-htm')[0];

function onSubmit(event) {
  event.preventDefault();
  const output = this.getElementsByClassName('error-message')[0];
  const formData = new FormData(this);
  let requestData = {};

  for (const [k, v] of formData) {
    requestData[k] = v;
  }

  let url;
  if (this.classList.contains('sign-in-htm')) {
    url = 'https://neto-api.herokuapp.com/signin';
  } else {
    url = 'https://neto-api.herokuapp.com/signup';
  }

  const self = this;
  const request = fetch(url, {
    body: JSON.stringify(requestData),
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    if (data.error) {
      output.innerHTML = data.message;
    } else {
      if (self.classList.contains('sign-in-htm')) {
        output.innerHTML = `Пользователь ${data.name} успешно авторизован`;
      } else {
        output.innerHTML = `Пользователь ${data.name} успешно зарегистрирован`;
      }
    }
  });
}

auth.addEventListener('submit', onSubmit);
reg.addEventListener('submit', onSubmit);
