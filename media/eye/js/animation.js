'use strict';

const eye = document.querySelector('.big-book__eye');
const pupil = document.querySelector('.big-book__pupil');

function updatePupil(event) {
  console.log(event);
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;

  let rect = pupil.getBoundingClientRect();
  let pupilX = rect.x + rect.width / 2;
  let pupilY = rect.y + rect.height / 2;

  let distance = Math.sqrt((event.pageX - pupilX) * (event.pageX - pupilX) + (event.pageY - pupilY) * (event.pageY - pupilY));
  let maxDistance = Math.sqrt(pupilX * pupilX + (window.innerHeight - pupilY) * (window.innerHeight - pupilY));

  let relativeDistance = distance / maxDistance;
  let pupilSize;
  if (relativeDistance > 2 / 3) {
    pupilSize = 1;
  } else if (relativeDistance > 1 / 3) {
    pupilSize = 2;
  } else {
    pupilSize = 3;
  }

  let distanceX = event.pageX - pupilX;
  let distanceY = event.pageY - pupilY;

  let relativeX = distanceX / (windowWidth / 2);
  let relativeY = distanceY / (windowHeight / 2);

  pupil.style.setProperty('--pupil-size', pupilSize);
  pupil.style.setProperty('--pupil-x', (30 * relativeX).toString() + 'px');
  pupil.style.setProperty('--pupil-y', (30 * relativeY).toString() + 'px');
};

document.addEventListener('mousemove', updatePupil);
document.addEventListener('scroll', updatePupil);
