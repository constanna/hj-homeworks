'use strict';

const app = document.querySelector('.app');
const controls = document.querySelector('.controls');
const error = document.getElementById('error-message');
const getPhoto = document.getElementById('take-photo');
const list = document.querySelector('.list');
let canvas, video, stream;

let audio = document.createElement('audio');
let source = document.createElement('source');
source.src = './audio/click.mp3';
app.appendChild(audio);
audio.appendChild(source);

function makePhoto(str) {
  stream = str;
  video = document.createElement('video');
  video.autoplay = true;
  app.appendChild(video);

  canvas = document.createElement('canvas');
  app.appendChild(canvas);

  video.srcObject = stream;
  controls.style.display = 'block';
}

getPhoto.addEventListener('click', function(event) {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);
  audio.play();

  let figure = document.createElement('figure');
  let image = document.createElement('img');
  let figcaption = document.createElement('figcaption');
  image.src = canvas.toDataURL();
  list.appendChild(figure);
  figure.appendChild(image);
  figure.appendChild(figcaption);

  let downloadButton = document.createElement('a');
  downloadButton.href = image.src.replace('image/png', 'image/octet-stream');
  downloadButton.download = 'snapshot.png';
  let fileDownload = document.createElement('i');
  fileDownload.classList.add('material-icons');
  fileDownload.innerHTML = 'file_download';
  figcaption.appendChild(downloadButton);
  downloadButton.appendChild(fileDownload);

  let uploadButton = document.createElement('a');
  let fileUpload = document.createElement('i');
  fileUpload.classList.add('material-icons');
  fileUpload.innerHTML = 'file_upload';
  figcaption.appendChild(uploadButton);
  uploadButton.appendChild(fileUpload);

  let deleteButton = document.createElement('a');
  let fileDelete = document.createElement('i');
  fileDelete.classList.add('material-icons');
  fileDelete.innerHTML = 'delete';
  figcaption.appendChild(deleteButton);
  deleteButton.appendChild(fileDelete);

  uploadButton.addEventListener('click', function() {
    let fd = new FormData();
    fd.append('image', image.src);
    fetch('https://neto-api.herokuapp.com/photo-booth', {
      method: 'POST',
      body: fd,
    }).then(resp => console.log(resp)).catch(err => console.log(err))
  });

  deleteButton.addEventListener('click', function() {
    figure.remove();
  });
});

navigator.mediaDevices
  .getUserMedia({video: true, audio: false})
  .then(makePhoto)
  .catch(err => {
    console.log(err);
    error.style.display = 'block';
    error.innerHTML = 'Доступ к камере запрещён';
  });
