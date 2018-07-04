var images = ['breuer-building.jpg', 'guggenheim-museum.jpg', 'headquarters.jpg', 'IAC.jpg', 'new-museum.jpg'];
var number = 0;
const element = document.getElementById('currentPhoto');

function setImage(n) {
  element.src = 'i/' + images[n];
}

setImage(number);

function showNext() {
  number++;
  if (number >= images.length) {
    number = 0;
  }
  setImage(number);
}

function showPrev() {
  number--;
  if (number < 0) {
    number = images.length - 1;
  }
  setImage(number);
}

const buttonNext = document.getElementById('nextPhoto');
buttonNext.onclick = showNext;

const buttonPrev = document.getElementById('prevPhoto');
buttonPrev.onclick = showPrev;
