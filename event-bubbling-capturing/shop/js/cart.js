'use strict';

const menu = document.querySelector('.items-list');
menu.addEventListener('click', function(event) {
  if (!event.target.classList.contains('add-to-cart')) {
    return;
  }

  event.preventDefault();
  
  let title = event.target.dataset['title'];
  let price = event.target.dataset['price'];

  let goods = {
    title: title,
    price: price
  };
  addToCart(goods);
});
