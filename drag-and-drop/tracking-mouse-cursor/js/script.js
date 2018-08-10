'use script';

const leftEyeArea = document.querySelector('.cat_position_for_left_eye');
const leftEye = document.querySelector('.cat_eye_left');
const rightEyeArea = document.querySelector('.cat_position_for_right_eye');
const rightEye = document.querySelector('.cat_eye_right');

const leftEyeWidth = leftEye.getBoundingClientRect().width;
const leftEyeHeight = leftEye.getBoundingClientRect().height;

const leftRect = leftEyeArea.getBoundingClientRect();
const leftMinX = leftRect.x;
const leftMaxX = leftRect.x + leftRect.width - leftEyeWidth;
const leftMinY = leftRect.y;
const leftMaxY = leftRect.y + leftRect.height - leftEyeHeight;

const rightEyeWidth = rightEye.getBoundingClientRect().width;
const rightEyeHeight = rightEye.getBoundingClientRect().height;

const rightRect = rightEyeArea.getBoundingClientRect();
const rightMinX = rightRect.x;
const rightMaxX = rightRect.x + rightRect.width - rightEyeWidth;
const rightMinY = rightRect.y;
const rightMaxY = rightRect.y + rightRect.height - rightEyeHeight;

document.addEventListener('mousemove', event => {
  let newX = event.pageX;
  let newY = event.pageY;
  let newLeftX = Math.max(newX, leftMinX);
  newLeftX = Math.min(newLeftX, leftMaxX);
  let newLeftY = Math.max(newY, leftMinY);
  newLeftY = Math.min(newLeftY, leftMaxY);
  leftEye.style.top = (newLeftY - leftRect.y).toString() + 'px';
  leftEye.style.left = (newLeftX - leftRect.x).toString() + 'px';

  let newRightX = Math.max(newX, rightMinX);
  newRightX = Math.min(newRightX, rightMaxX);
  let newRightY = Math.max(newY, rightMinY);
  newRightY = Math.min(newRightY, rightMaxY);
  rightEye.style.top = (newRightY - rightRect.y).toString() + 'px';
  rightEye.style.left = (newRightX - rightRect.x).toString() + 'px';
});
