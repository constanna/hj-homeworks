'use strict';

const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');

window.editor.addEventListener('update', event => {
  const ctx = event.canvas.getContext('2d');
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const binary = Uint8Array.from(image.data);
  canvas.toBlob(blob => ws.send(blob));
});
