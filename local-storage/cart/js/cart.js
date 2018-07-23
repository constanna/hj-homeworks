'use strict';

const colorSwatch = document.getElementById('colorSwatch');
const sizeSwatch = document.getElementById('sizeSwatch');
const cart = document.getElementById('quick-cart');
const addForm = document.getElementById('AddToCartForm');
const bigImage = document.getElementById('big-image');
const pricePreview = document.getElementById('price-preview');
const colors = document.querySelectorAll('#colorSwatch > .swatch-element');
const sizes = document.querySelectorAll('#sizeSwatch .swatch-element');
const title = document.querySelector('h1');

fetch('https://neto-api.herokuapp.com/cart/colors')
.then(function(response) {
  return response.json();
}).then(function(data) {
  let defaultColor;
  if (localStorage.color !== undefined) {
    defaultColor = localStorage.color;
  } else {
    defaultColor = data.filter((color) => color.isAvailable)[0].type;
  }
  let checked = '';

  for (let color of data) {
    let soldOutClass = color.isAvailable ? 'available' : 'soldout';
    let disabled = color.isAvailable ? '' : 'disabled';

    if (color.type === defaultColor) {
      checked = 'checked';
    } else {
      checked = '';
    }

    colorSwatch.innerHTML += `<div data-value=${color.type} class="swatch-element color ${color.type} ${soldOutClass}">
      <div class="tooltip">${color.title}</div>
      <input quickbeam="color" id="swatch-1-${color.type}" type="radio" name="color" value=${color.type} ${checked}>
      <label for="swatch-1-${color.type}" style="border-color:${color.type};">
        <span style="background-color: ${color.code};"></span>
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;
  }

  let colorElements = colorSwatch.querySelectorAll('input');
  for (let colorElement of colorElements) {
    colorElement.addEventListener('click', function() {
      localStorage.color = this.value;
    });
  }
});

fetch('https://neto-api.herokuapp.com/cart/sizes')
.then(function(response) {
  return response.json();
}).then(function(data) {
  let defaultSize;
  if (localStorage.size !== undefined) {
    defaultSize = localStorage.size;
  } else {
    defaultSize = data.filter((color) => size.isAvailable)[0].type;
  }
  let checked = '';

  for (let size of data) {
    let soldOutClass = size.isAvailable ? 'available' : 'soldout';
    let disabled = size.isAvailable ? '' : 'disabled';

    if (size.type === defaultSize) {
      checked = 'checked';
    } else {
      checked = '';
    }

    sizeSwatch.innerHTML += `<div data-value=${size.type} class="swatch-element plain ${size.type} ${soldOutClass}">
      <input id="swatch-0-${size.type}" type="radio" name="size" value=${size.type} ${disabled} ${checked}>
      <label for="swatch-0-${size.type}">
        ${size.title}
        <img class="crossed-out" src="https://neto-api.herokuapp.com/hj/3.3/cart/soldout.png?10994296540668815886">
      </label>
    </div>`;
  }

  let sizeElements = sizeSwatch.querySelectorAll('input');
  for (let sizeElement of sizeElements) {
    sizeElement.addEventListener('click', function() {
      localStorage.size = this.value;
    });
  }
});

fetch('https://neto-api.herokuapp.com/cart')
.then(function(response) {
  return response.json();
}).then(function(data) {
  updateCart(data);
});

function updateCart(goods) {
  let open = '';
  if (goods.length !== 0) {
    open = 'open';
  }

  let total = 0;
  cart.innerHTML = '';

  for (let item of goods) {
    total += item.quantity * item.price;
    cart.innerHTML += `<div class="quick-cart-product quick-cart-product-static" id="quick-cart-product-${item.id}" style="opacity: 1;">
      <div class="quick-cart-product-wrap">
        <img src=${item.pic} title=${item.title}>
        <span class="s1" style="background-color: #000; opacity: .5">$${item.price}</span>
        <span class="s2"></span>
      </div>
      <span class="count hide fadeUp" id="quick-cart-product-count-${item.id}">${item.quantity}</span>
      <span class="quick-cart-product-remove remove" data-id=${item.id}></span>
    </div>`;
  }

  cart.innerHTML += `<a id="quick-cart-pay" quickbeam="cart-pay" class="cart-ico ${open}">
    <span>
      <strong class="quick-cart-text">Оформить заказ<br></strong>
      <span id="quick-cart-price">$${total}</span>
    </span>
  </a>`;
}

addForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  formData.append('productId', this.dataset['productId']);
  let requestData = {};

  for (const [k, v] of formData) {
    requestData[k] = v;
  }

  fetch('https://neto-api.herokuapp.com/cart', {
    body: formData,
    method: 'POST',
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
    updateCart(data);
  });
});

cart.addEventListener('click', function(event) {
  const target = event.target;
  if (target.classList.contains('remove')) {
    const formData = new FormData();
    formData.append('productId', target.dataset['id']);
    fetch('https://neto-api.herokuapp.com/cart/remove', {
      body: formData,
      method: 'POST',
    }).then(function(response) {
      return response.json();
    }).then(function(data) {
      updateCart(data);
    });
  }
});
