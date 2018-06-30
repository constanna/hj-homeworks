let buttons = document.getElementsByClassName('drum-kit__drum');

function play() {
  this.getElementsByTagName('audio')[0].play();
}

Array.from(buttons).forEach(function(button) {
  button.onclick = play;
});
