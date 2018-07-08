document.addEventListener('DOMContentLoaded', function() {
  let data = loadContacts();
  let contacts = JSON.parse(data);

  const ul = document.getElementsByClassName('contacts-list')[0];
  ul.innerHTML = '';

  for (let contact of contacts) {
    let liHTML = `<li data-email="${contact.email}" data-phone="${contact.phone}">
      <strong>${contact.name}</strong>
    </li>`;

    ul.innerHTML += liHTML;
  }
});
