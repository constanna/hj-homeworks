'use strict';

const canvas = document.getElementById('wall');
const ctx = canvas.getContext('2d');
let int;

let figures = [];

function init() {
  if (int) {
    clearInterval(int);
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  ctx.strokeStyle = '#ffffff';

  let amount = Math.random() * 150 + 50;

  for (let i = 0; i <= amount / 2; i++) {
    let figureX = Math.random() * canvas.width;
    let figureY = Math.random() * canvas.height;
    let nextPoint = Math.random() > 0.5 ? nextPoint1 : nextPoint2;
    let figureSize = Math.random() * 0.5 + 0.1;
    let figure = new Circle(figureX, figureY, nextPoint, figureSize);
    figures.push(figure);
  }

  for (let j = 0; j <= amount / 2; j++) {
    let figureX = Math.random() * canvas.width;
    let figureY = Math.random() * canvas.height;
    let nextPoint = Math.random() > 0.5 ? nextPoint1 : nextPoint2;
    let figureSize = Math.random() * 0.5 + 0.1;
    let figureAngle = Math.random() * Math.PI * 2;
    let figureSpeed = Math.random() * 0.4 - 0.2;
    let figure = new Cross(figureX, figureY, nextPoint, figureSize, figureAngle, figureSpeed);
    figures.push(figure);
  }

  drawAll();
  int = setInterval(drawAll, 50);
}

document.addEventListener('DOMContentLoaded', init);
window.addEventListener('resize', init);

class Figure {
  constructor(x, y, functionTime, size) {
    this.x = x;
    this.y = y;
    this.functionTime = functionTime;
    this.size = size;
    this.width = 5 * size;
  }
}

class Circle extends Figure {
  constructor(x, y, functionTime, size) {
    super(x, y, functionTime, size);
    this.radius = 12 * size;
  }

  draw(ctx) {
    let newPos = this.functionTime(this.x, this.y, Date.now());

    ctx.beginPath();
    ctx.arc(newPos.x, newPos.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
  }
}

class Cross extends Figure {
  constructor(x, y, functionTime, size, angle, speed) {
    super(x, y, functionTime, size);
    this.side = 20 * size;
    this.angle = angle;
    this.speed = speed;
  }

  draw(ctx) {
    let newPos = this.functionTime(this.x, this.y, Date.now());
    this.angle += this.speed;

    ctx.save();
    ctx.translate(newPos.x, newPos.y);
    ctx.rotate(this.angle);
    ctx.beginPath();
    ctx.moveTo(-this.side / 2, 0);
    ctx.lineTo(this.side / 2, 0);
    ctx.stroke();
    ctx.moveTo(0, -this.side / 2);
    ctx.lineTo(0, this.side / 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

function nextPoint1(x, y, time) {
  return {
    x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
    y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
  };
}

function nextPoint2(x, y, time) {
  return {
    x: x + Math.sin((x + (time / 10)) / 100) * 5,
    y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
  }
}

function drawAll() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let figure of figures) {
    figure.draw(ctx);
  }
}
