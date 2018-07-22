'use strict';

const counter = document.getElementsByClassName('counter')[0];
const errors = document.getElementsByClassName('errors')[0];

const connection = new WebSocket('wss://neto-api.herokuapp.com/counter');

connection.addEventListener('message', event => {
  let message = JSON.parse(event.data);
  counter.innerHTML = message.connections;
  errors.innerHTML = message.errors;
});

window.addEventListener('beforeunload', () => {
  connection.close(1000);
});
