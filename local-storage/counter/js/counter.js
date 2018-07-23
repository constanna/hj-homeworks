'use strict';

const counter = document.getElementById('counter');
const increment = document.getElementById('increment');
const decrement = document.getElementById('decrement');
const reset = document.getElementById('reset');

if (localStorage.counter === undefined) {
  localStorage.counter = 0;
}
counter.innerHTML = localStorage.counter;

increment.addEventListener('click', function() {
  localStorage.counter++;
  counter.innerHTML = localStorage.counter;
});

decrement.addEventListener('click', function() {
  if (localStorage.counter > 0) {
    localStorage.counter--;
    counter.innerHTML = localStorage.counter;
  }
});

reset.addEventListener('click', function() {
  localStorage.counter = 0;
  counter.innerHTML = localStorage.counter;
});
