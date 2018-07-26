'use strict';

const wallpaper = document.querySelector('[data-wallpaper]');
const username = document.querySelector('[data-username]');
const description = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const tweets = document.querySelector('[data-tweets]');
const followers = document.querySelector('[data-followers]');
const following = document.querySelector('[data-following]');

function loadData(url) {
  return new Promise((done, fail) => {
    window.done = done;
    const script = document.createElement('script');
    script.src = url;
    document.body.appendChild(script);
  });
}

loadData('https://neto-api.herokuapp.com/twitter/jsonp?jsonp=done').then(function (data) {
  wallpaper.src = data.wallpaper;
  username.innerHTML = data.username;
  description.innerHTML = data.description;
  pic.src = data.pic;
  tweets.innerHTML = data.tweets;
  followers.innerHTML = data.followers;
  following.innerHTML = data.following;
});
