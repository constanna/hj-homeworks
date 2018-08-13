'use strict';

const trashBin = document.getElementById('trash_bin');
let dragged = null;

document.addEventListener('mousedown', event => {
  if (!event.target.classList.contains('logo')) {
    return;
  }
  event.preventDefault();
  dragged = event.target;
  dragged.classList.add('moving');
});

document.addEventListener('mousemove', event => {
  if (dragged === null) {
    return;
  }
  event.preventDefault();
  let rect = dragged.getBoundingClientRect();
  dragged.style.left = `${event.pageX - rect.width / 2}px`;
  dragged.style.top = `${event.pageY - rect.height / 2}px`;
});

document.addEventListener('mouseup', event => {
  if (dragged === null) {
    return;
  }
  event.preventDefault();
  dragged.classList.remove('moving');
  if (event.target === trashBin) {
    dragged.style.display = 'none';
  }
  dragged = null;
});
