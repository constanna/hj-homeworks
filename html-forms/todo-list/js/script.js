document.addEventListener('DOMContentLoaded', function () {
  const block = document.querySelector('.list-block');
  const checkboxes = document.querySelectorAll('.list-block input');
  const output = document.querySelector('output');

  function update() {
    let numberChecked = 0;
    for (let checkbox of checkboxes) {
      if (checkbox.checked) {
        numberChecked++;
      }
    }

    output.innerHTML = `${numberChecked} из ${checkboxes.length}`;
    block.classList.toggle('complete', numberChecked === checkboxes.length);
  }

  update();

  for (let checkbox of checkboxes) {
    checkbox.addEventListener('change', update);
  }
});
