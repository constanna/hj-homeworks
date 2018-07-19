'use strict';

function handleTableClick(event) {
  if (event.target.tagName !== 'TH') {
    return;
  }

  let column = event.target.dataset['propName'];
  const table = document.querySelector('table');
  table.dataset['sortBy'] = column;

  if (event.target.dataset['sortBy'] == 1) {
    event.target.dataset['sortBy'] = -1;
  } else {
    event.target.dataset['sortBy'] = 1;
  }
  sortTable(column, event.target.dataset['sortBy'])
}
