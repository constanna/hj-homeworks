let player = document.getElementsByClassName('mediaplayer')[0];
let audio = document.getElementsByTagName('audio')[0];
let play = document.getElementsByClassName('playstate')[0];
let stop = document.getElementsByClassName('stop')[0];

play.onclick = function() {
  player.classList.toggle('play');
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

stop.onclick = function() {
  audio.pause();
  audio.currentTime = 0;
  player.classList.remove('play');
}

let tracks = ['LA Chill Tour.mp3', 'LA Fusion Jam.mp3', 'This is it band.mp3'];
let title = document.getElementsByClassName('title')[0];

function setTrack(num) {
  let isPaused = audio.paused;
  audio.src = 'mp3/' + tracks[num];
  title.title = tracks[num];
  currentTrack = num;
  if (!isPaused) {
    audio.play();
  }
}

let currentTrack = 0;
setTrack(currentTrack);

let back = document.getElementsByClassName('back')[0];
let next = document.getElementsByClassName('next')[0];

back.onclick = function() {
  if (currentTrack > 0) {
    currentTrack--;
  } else {
    currentTrack = tracks.length - 1;
  }
  setTrack(currentTrack);
}

next.onclick = function() {
  if (currentTrack < tracks.length - 1) {
    currentTrack++;
  } else {
    currentTrack = 0;
  }
  setTrack(currentTrack);
}
