'use strict';

const block = document.querySelector('.block');
const message = document.querySelector('.message');
const textarea = document.querySelector('textarea');
let timeout;

function debounce(callback, delay) {
  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      callback();
    }, delay);
  };
};

function start() {
  block.classList.add('active');
  message.classList.remove('view');
};

textarea.addEventListener('keydown', debounce(() => {
  block.classList.remove('active');
  message.classList.add('view');
}, 2000));

textarea.addEventListener('focus', start);

textarea.addEventListener('keydown', start);

textarea.addEventListener('blur', function() {
  message.classList.remove('view');
  block.classList.remove('active');
  clearTimeout(timeout);
});
