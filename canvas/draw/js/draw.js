'use strict';

const canvas = document.getElementById('draw');
const ctx = canvas.getContext('2d');
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

let currWidth = 100;
let usedWidth;
let widthUp = false;
let currHue = 0;
let currColor;
let shift = false;

let drawing = false;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.addEventListener('DOMContentLoaded', resizeCanvas);
window.addEventListener('resize', resizeCanvas);

canvas.addEventListener('mousedown', function(event) {
  drawing = true;
  usedWidth = currWidth;
  ctx.beginPath();
  ctx.moveTo(event.pageX, event.pageY);
});

canvas.addEventListener('mouseup', function() {
  drawing = false;
  ctx.closePath();
});

canvas.addEventListener('mouseleave', function() {
  drawing = false;
});

canvas.addEventListener('dblclick', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

canvas.addEventListener('mousemove', function(event) {
  if (!drawing) {
    return;
  }

  ctx.arc(event.pageX, event.pageY, currWidth, 0, Math.PI * 2, true);
  ctx.fillStyle = currColor;
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
});

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 16) {
    shift = true;
  }
});

document.addEventListener('keyup', function (event) {
  if (event.keyCode == 16) {
    shift = false;
  }
});

function tick () {
  if (shift) {
    currHue = Math.max(0, currHue - 1);
  } else {
    currHue = Math.min(359, currHue + 1);
  }
  currColor = 'hsl('+ currHue +', 100%, 50%)';

  if (widthUp) {
    currWidth++;
    if (currWidth == 100) {
      widthUp = false;
    }
  } else {
    currWidth--;
    if (currWidth == 5) {
      widthUp = true;
    }
  }
  window.requestAnimationFrame(tick);
}

tick();
