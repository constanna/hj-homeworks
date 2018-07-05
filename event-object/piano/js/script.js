let piano = document.getElementsByTagName('ul')[0];
let sounds = ["first.mp3", "second.mp3", "third.mp3", "fourth.mp3", "fifth.mp3"];

function setMode (mode) {
  if (piano.classList.contains(mode)) {
    return;
  }
  piano.classList.remove('higher', 'middle', 'lower');
  piano.classList.add(mode);

  let elements = document.getElementsByTagName('audio');
  for (let i = 0; i < elements.length; i++) {
    elements[i].src = `sounds/${mode}/${sounds[i]}`;
  }
}

piano.classList.remove('higher', 'middle', 'lower');
setMode("middle");

function play () {
  let audio = this.getElementsByTagName('audio')[0];
  audio.currentTime = 0;
  audio.play();
}

let keys = document.getElementsByTagName('li');
for (let key of keys) {
  key.addEventListener('click', play);
}

document.addEventListener('keydown', function(event) {
  switch (event.key) {
    case 'Shift':
      setMode('lower');
      break;
    case 'Alt':
      setMode('higher');
      break;
  }
});

document.addEventListener('keyup', function(event) {
  setMode('middle');
});
