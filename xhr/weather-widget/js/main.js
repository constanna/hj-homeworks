const request = new XMLHttpRequest();
request.addEventListener('readystatechange', function() {
  if ((request.readyState === 4) && (request.status === 200)) {
    const response = JSON.parse(request.responseText);
    setData(response);
  }
});
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather', true);
request.send();
