document.addEventListener('DOMContentLoaded', function() {
  const done = document.querySelector('.done');
  const undone = document.querySelector('.undone');
  const inputs = document.querySelectorAll('input');

  function onClick() {
    let label = this.parentElement;
    let parent = this.parentElement.parentElement;

    label.remove();
    if (parent === done) {
      undone.appendChild(label);
    } else {
      done.appendChild(label);
    }
  }

  for (let input of inputs) {
    input.addEventListener('click', onClick);
  }
});
