let links = document.getElementsByTagName('a');
let image = document.getElementsByTagName('img')[0];

function makeActive (event) {
  for (let link of links) {
    link.classList.remove('gallery-current');
  }
  this.classList.add('gallery-current');

  event.preventDefault();
  image.src = this.href;
}

for (let link of links) {
  link.addEventListener('click', makeActive);
}
