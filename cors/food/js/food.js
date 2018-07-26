'use strict';

const pic = document.querySelector('[data-pic]');
const title = document.querySelector('[data-title]');
const ingredients = document.querySelector('[data-ingredients]');
const rating = document.querySelector('[data-rating]');
const star = document.querySelector('[data-star]');
const votes = document.querySelector('[data-votes]');
const consumers = document.querySelector('[data-consumers]');

function loadData(url) {
  return new Promise((done, fail) => {
    window.callback = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/food/42').then(function(data) {
  title.innerHTML = data.title;
  pic.style['background-image'] = `url("${data.pic}")`;
  ingredients.innerHTML = data.ingredients.join(',');

  loadData(`https://neto-api.herokuapp.com/food/42/rating`).then(function(data) {
    rating.innerHTML = data.rating.toFixed(2);
    votes.innerHTML = `(${data.votes} оценок)`;
    star.style.width = data.rating / 10 * 100 + '%';

    loadData(`https://neto-api.herokuapp.com/food/42/consumers`).then(function(data) {
      let users = '';
      for (let user of data.consumers) {
        users += `<img src="${user.pic}" title="${user.name}">`;
      }
      if (data.total > data.consumers.length) {
        users += `<span>(+${data.total - data.consumers.length})</span>`;
      }
      consumers.innerHTML = users;
    });
  });
});
