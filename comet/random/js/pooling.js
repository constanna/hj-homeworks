'use strict';

const poolingDivs = document.querySelectorAll('.pooling div');

function updateCard(divs, number) {
  for (let div of divs) {
    div.classList.remove('flip-it');
  }
  let current = divs[number - 1];
  current.classList.add('flip-it');
}

setInterval(() => {
  fetch('https://neto-api.herokuapp.com/comet/pooling')
    .then(res => res.json())
    .then(num => updateCard(poolingDivs, num));
}, 5000);
