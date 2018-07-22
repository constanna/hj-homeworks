'use strict';

const chat = document.getElementsByClassName('chat')[0];
let chatStatus = chat.getElementsByClassName('chat-status')[0];
const button = chat.getElementsByClassName('message-submit')[0];
const loading = chat.querySelector('.messages-templates .loading');
const message = chat.querySelectorAll('.messages-templates .message')[1];
const personal = chat.querySelector('.messages-templates .message-personal');
const status = chat.querySelector('.messages-templates .message-status');
let content = chat.getElementsByClassName('messages-content')[0];
const messageBox = chat.querySelector('.message-box');
const messageInput = chat.querySelector('.message-box .message-input');

function addMessage(message, template) {
  let mes = template.cloneNode(true);
  mes.querySelector('.message-text').innerHTML = message;

  let timestamp = mes.getElementsByClassName('timestamp');
  if (timestamp.length > 0) {
    timestamp[0].innerHTML = (new Date()).toLocaleTimeString().substr(0, 5);
  }
  content.append(mes);
}

const connection = new WebSocket('wss://neto-api.herokuapp.com/chat');
connection.addEventListener('open', () => {
  chatStatus.innerHTML = chatStatus.dataset['online'];
  button.removeAttribute('disabled');
  addMessage('Пользователь печатает сообщение', status)
});

connection.addEventListener('message', event => {
  let data = event.data;
  if (data === '...') {
    addMessage('Пользователь печатает сообщение', printing)
  } else {
    let tempStatus = content.querySelector('.message-status');
    if (tempStatus !== null) {
      tempStatus.remove();
    }
    addMessage(data, message);
  }
});

messageBox.addEventListener('submit', function(event) {
  event.preventDefault();
  connection.send(messageInput.value);
  addMessage(messageInput.value, personal);
});

messageInput.addEventListener('keyPress', function(event) {
  event.preventDefault();
  connection.send(this.value);
  addMessage(this.value, personal);
});

connection.addEventListener('close', event => {
  chatStatus.innerHTML = chatStatus.dataset['offline'];
  button.addAttribute('disabled');
  addMessage('Пользователь не в сети', status)
});
