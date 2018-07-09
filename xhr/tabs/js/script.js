const links = document.querySelectorAll('nav a');
const content = document.getElementById('content');
const preloader = document.getElementById('preloader');
const currentTab =  document.querySelector('a.active');

function tabClick(event) {
  event.preventDefault();
  activateTab(this);
}

function activateTab (tab) {
  const href = tab.href;
  var xhr = new XMLHttpRequest();

  xhr.open("GET", href, true);
  xhr.addEventListener('readystatechange', function() {
    if (xhr.readyState === 4) {
      let html = xhr.responseText;
      content.innerHTML = html;
      preloader.classList.add('hidden');
    }
  });

  xhr.send();
  preloader.classList.remove('hidden');
  for (let link of links) {
    link.classList.remove('active');
  }
  tab.classList.add('active');
}

activateTab(currentTab);

for (let link of links) {
  link.addEventListener('click', tabClick);
}
