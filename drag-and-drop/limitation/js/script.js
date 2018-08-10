'use strict';

const block = document.querySelector('.block');
const message = document.querySelector('.message');
const textarea = document.querySelector('textarea');

function debounce(callback, delay) {
  let timeout;
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};

textarea.addEventListener('keydown', debounce(() => {
  block.classList.remove('active');
  message.classList.add('view');
}, 2000));

textarea.addEventListener('keydown', function() {
  block.classList.add('active');
  message.classList.remove('view');
});
