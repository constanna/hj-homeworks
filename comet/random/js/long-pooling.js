'use strict';

const longPoolingDivs = document.querySelectorAll('.long-pooling div');
let inProcess = false;

setInterval(() => {
  if (inProcess) {
    return;
  }
  inProcess = true;
  fetch('https://neto-api.herokuapp.com/comet/long-pooling')
    .then(res => res.json())
    .then(num => {
      updateCard(longPoolingDivs, num);
      inProcess = false;
    });
}, 1000);
