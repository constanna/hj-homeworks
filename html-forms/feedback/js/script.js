document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('.form-group textarea, .form-group input');
  const buttonSend = document.querySelector('.contentform > button');
  const buttonChange = document.querySelector('main > button');
  const zip = document.querySelector('[name="zip"]');
  const form = document.querySelector('.contentform');
  const output = document.getElementById('output');

  function activateButtonSend () {
    for (let input of inputs) {
      if (input.value === '') {
        buttonSend.setAttribute('disabled', true);
        return;
      }
    }
    buttonSend.removeAttribute('disabled');
  }

  function activateButtonChange() {
    output.classList.add('hidden');
    form.classList.remove('hidden');
  }

  for (let input of inputs) {
    input.addEventListener('change', activateButtonSend);
  }

  zip.addEventListener('input', function(event) {
    this.value = this.value.replace(/\D/g,'');
  });

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    form.classList.add('hidden');

    for (let input of inputs) {
      let element = document.getElementById(input.name);
      if (element !== null) {
        element.innerHTML = input.value;
      }
    }
    output.classList.remove('hidden');
  });

  buttonChange.addEventListener('click', activateButtonChange);

  activateButtonSend();
});
