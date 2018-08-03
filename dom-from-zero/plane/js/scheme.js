'use strict'

const btnSeatMap = document.getElementById('btnSeatMap');
const btnSetFull = document.getElementById('btnSetFull');
const btnSetEmpty = document.getElementById('btnSetEmpty');
const acSelect = document.getElementById('acSelect');
const formInline = document.querySelector('.form-inline');
const seatMapTitle = document.getElementById('seatMapTitle');
const seatMapDiv = document.getElementById('seatMapDiv');
const totalPax = document.getElementById('totalPax');
const totalAdult = document.getElementById('totalAdult');
const totalHalf = document.getElementById('totalHalf');

btnSetFull.disabled = true;
btnSetEmpty.disabled = true;

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));

  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function updateNumbers() {
  let adultNumber = document.querySelectorAll('.seat.adult').length;
  let halfNumber = document.querySelectorAll('.seat.half').length;
  let paxNumber = adultNumber + halfNumber;

  totalAdult.innerHTML = adultNumber;
  totalHalf.innerHTML = halfNumber;
  totalPax.innerHTML = paxNumber;
}

function showScheme(res) {
  seatMapTitle.textContent = `${res.title} (${res.passengers} пассажиров)`;
  let rows = document.createDocumentFragment();
  for (let i in res.scheme) {
    let seatNumber = res.scheme[i];

    let leftSeats = [];
    let rightSeats = [];
    switch (seatNumber) {
      case 0:
        for (let i = 0; i < 3; i++) {
          leftSeats.push(el('div', {class: 'col-xs-4 no-seat'}));
          rightSeats.push(el('div', {class: 'col-xs-4 no-seat'}));
        }
        break;
      case 4:
      leftSeats.push(el('div', {class: 'col-xs-4 no-seat'}));
        for (let i = 0; i < 2; i++) {
          leftSeats.push(el('div', {class: 'col-xs-4 seat'}, [
            el('span', {class: 'seat-label'}, res.letters4[i])
          ]));
          rightSeats.push(el('div', {class: 'col-xs-4 seat'}, [
            el('span', {class: 'seat-label'}, res.letters4[i+2])
          ]));
        }
        rightSeats.push(el('div', {class: 'col-xs-4 no-seat'}));
        break;
      case 6:
        for (let i = 0; i < 3; i++) {
          leftSeats.push(el('div', {class: 'col-xs-4 seat'}, [
            el('span', {class: 'seat-label'}, res.letters6[i])
          ]));
          rightSeats.push(el('div', {class: 'col-xs-4 seat'}, [
            el('span', {class: 'seat-label'}, res.letters6[i+3])
          ]));
        }
        break;
    }

    let row = el('div', {class: 'row seating-row text-center'}, [
      el('div', {class: 'col-xs-1 row-number'}, [
        el('h2', {class: ''}, (parseInt(i)+1).toString())
      ]),
      el('div', {class: 'col-xs-5'}, leftSeats),
      el('div', {class: 'col-xs-5'}, rightSeats)
    ]);
    rows.appendChild(row);
  }
  seatMapDiv.innerHTML = '';
  seatMapDiv.appendChild(rows);

  updateNumbers();
  btnSetFull.disabled = false;
  btnSetEmpty.disabled = false;
}

seatMapDiv.addEventListener('click', function(event) {
  let seat = event.target;
  if (seat.classList.contains('seat-label')) {
    seat = seat.parentNode;
  }

  if (!seat.classList.contains('seat')) {
    return;
  }

  if (!seat.classList.contains('adult') && !seat.classList.contains('half')) {
    let newClass = event.altKey ? 'half' : 'adult';
    seat.classList.add(newClass);
  } else {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }
  updateNumbers();
});

formInline.addEventListener('submit', function(event) {
  event.preventDefault();
  btnSetFull.disabled = true;
  btnSetEmpty.disabled = true;
  fetch(`https://neto-api.herokuapp.com/plane/${acSelect.value}`)
    .then(res => res.json())
    .then(showScheme);
});

btnSetFull.addEventListener('click', function(event) {
  event.preventDefault();
  let seats = document.querySelectorAll('.seat');
  for (let seat of seats) {
    seat.classList.remove('half');
    seat.classList.add('adult');
  }
  updateNumbers();
});

btnSetEmpty.addEventListener('click', function(event) {
  event.preventDefault();
  let seats = document.querySelectorAll('.seat');
  for (let seat of seats) {
    seat.classList.remove('adult');
    seat.classList.remove('half');
  }
  updateNumbers();
});
