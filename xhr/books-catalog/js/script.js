const request = new XMLHttpRequest();
const list = document.getElementById('content');

function process (text) {
  let books = JSON.parse(text);
  console.log(books);

  let html = '';
  for (let book of books) {
    html += `<li
      data-title="${book.title}"
      data-author="${book.author.name}"
      data-info="${book.description}"
      data-price="${book.price}">
        <img src="${book.cover.small}">
      </li>`;
  }

  list.innerHTML = html;
}

request.open("GET", "https://neto-api.herokuapp.com/book/", true);
request.addEventListener('readystatechange', function() {
  if (request.readyState === 4) {
    process(request.responseText);
  }
});
request.send();
