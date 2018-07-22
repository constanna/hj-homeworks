'use strict';

const connection = new WebSocket('wss://neto-api.herokuapp.com/mouse');
connection.addEventListener('open', () => {
  showBubbles(connection);
});

const canvas = document.getElementsByTagName('canvas')[0];
canvas.addEventListener('click', function(event) {
  let coordinates = {
    x: event.x,
    y: event.y
  };
  connection.send(JSON.stringify(coordinates));
});
