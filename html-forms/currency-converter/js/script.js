document.addEventListener('DOMContentLoaded', function() {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');
  const from = document.getElementById('from');
  const to = document.getElementById('to');
  const source = document.getElementById('source');
  const result = document.getElementById('result');

  loader.classList.remove('hidden');

  const request = new XMLHttpRequest();
  request.addEventListener('readystatechange', function() {
    if ((request.readyState === 4) && (request.status === 200)) {
      const response = JSON.parse(request.responseText);
      loader.classList.add('hidden');
      content.classList.remove('hidden');

      for (let currency of response) {
        let option = `<option value="${currency.value}">${currency.code}</option>`;
        from.innerHTML += option;
        to.innerHTML += option;
      }
    }
  });
  request.open('GET', 'https://neto-api.herokuapp.com/currency', true);
  request.send();

  function calc() {
    let res = source.value / to.value * from.value;
    result.innerHTML = parseFloat(res).toFixed(2);
  }

  from.addEventListener('change', calc);
  to.addEventListener('change', calc);
  source.addEventListener('change', calc);
});
