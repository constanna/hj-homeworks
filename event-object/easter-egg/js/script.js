let navigation = document.getElementsByTagName('nav')[0];

document.addEventListener('keydown', function(event) {
  if ((event.key === 'T') && (event.altKey) && (event.ctrlKey)) {
    navigation.classList.toggle('visible');
  }
});

let secret = document.getElementsByClassName('secret')[0];

function showSecret() {
  secret.classList.add('visible');
}

const secretWord = ['KeyY', 'KeyT', 'KeyN', 'KeyJ', 'KeyK', 'KeyJ', 'KeyU', 'KeyB', 'KeyZ'];
let number = 0;

function check (event) {
  let letter = event.code;
  if (letter === secretWord[number]) {
    number++;
  } else {
    number = 0;
  }

  if (number >= secretWord.length) {
    showSecret();
  }
}

document.addEventListener('keypress', check);
