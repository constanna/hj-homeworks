document.addEventListener('DOMContentLoaded', function() {
  let amount = 0;
  let price = 0;

  let amountElement = document.getElementById('cart-count');
  let priceElement = document.getElementById('cart-total-price');

  function update() {
    amount += 1;
    amountElement.innerHTML = amount;

    price += parseInt(this.dataset.price);
    priceElement.innerHTML = getPriceFormatted(price);
  }

  let buttons = document.getElementsByClassName('add');
  for (let button of buttons) {
    button.addEventListener('click', update);
  }
});
