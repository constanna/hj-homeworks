'use strict';

const name = document.querySelector('[data-name]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const technologies = document.querySelector('[data-technologies]');
const content = document.getElementsByClassName('content')[0];

function loadData(url) {
  return new Promise((done, fail) => {
    window.callback = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/profile/me').then(function(data) {
  name.innerHTML = data.name;
  description.innerHTML = data.description;
  pic.src = data.pic;
  position.innerHTML = data.position;

  loadData(`https://neto-api.herokuapp.com/profile/${data.id}/technologies`).then(function(data) {
    let techs = '';
    for (let tech of data) {
      techs += `<span class="devicons devicons-${tech}"></span>`;
    }
    technologies.innerHTML = techs;
    content.style.display = 'initial';
  });
});
