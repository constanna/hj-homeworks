'use strict';

const websocketDivs = document.querySelectorAll('.websocket div');

const ws = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
ws.addEventListener('message', event => {
  let data = JSON.parse(event.data);
  updateCard(websocketDivs, data)
});
