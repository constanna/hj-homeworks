'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const PI = Math.PI;
var amount = (Math.random() * 200 + 200).toFixed(0);
var colors = ['#ffffff', '#ffe9c4', '#d4fbff'];
let x, y;
var color, alpha, size;

canvas.addEventListener('mousedown', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < amount; i++) {
    ctx.beginPath();
    x = Math.random() * canvas.width;
    y = Math.random() * canvas.height;
    color = colors[Math.floor(Math.random()*colors.length)];
    alpha = Math.random() * 0.3 + 0.8;
    size = Math.random() * 1.1;
    ctx.fillStyle = color;
    ctx.globalAlpha = alpha;
    ctx.arc(x, y, size, 0, 2 * PI);
    ctx.fill();
    ctx.closePath();
  }
});
