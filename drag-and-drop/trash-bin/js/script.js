'use strict';

let logos = document.querySelectorAll('.logo');
const trashBin = document.getElementById('trash_bin');
let target;

for (let logo of logos) {
  logo.addEventListener('dragstart', event => {
    target = event.target;
    target.classList.add('moving');
  });

  logo.addEventListener('dragend', event => {
    target = event.target;
    target.classList.remove('moving');
  });
}

trashBin.addEventListener('dragenter', event => {
  event.preventDefault();
});

trashBin.addEventListener('dragover', event => {
  event.preventDefault();
});

trashBin.addEventListener('drop', event => {
  event.preventDefault();
  target.style.display = 'none';
});
