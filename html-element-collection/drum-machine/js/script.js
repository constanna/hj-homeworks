let buttons = document.getElementsByClassName('drum-kit__drum');

function play() {
  let audio = this.getElementsByTagName('audio')[0];
  audio.currentTime = 0;
  audio.play();
}

Array.from(buttons).forEach(function(button) {
  button.onclick = play;
});
