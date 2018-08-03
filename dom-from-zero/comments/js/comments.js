'use strict';

function showComments(list) {
  const commentsContainer = document.querySelector('.comments');
  const comments = list.map(createComment);
  const fragment = comments.reduce((fragment, currentValue) => {
    fragment.appendChild(currentValue);
    return fragment;
  }, document.createDocumentFragment());
  commentsContainer.appendChild(fragment);
}

function el(tagName, attributes, children) {
  const element = document.createElement(tagName);
  Object.keys(attributes).forEach(i => element.setAttribute(i, attributes[i]));

  if (typeof children === 'string') {
    element.textContent = children;
  } else if (children instanceof Array) {
    children.forEach(child => element.appendChild(child));
  }
  return element;
}

function createComment(comment) {
  let commentText = document.createDocumentFragment();
  for (let line of comment.text.split('\n')) {
    if (commentText.lastChild !== null) {
      commentText.appendChild(document.createElement('br'));
    }
    commentText.appendChild(document.createTextNode(line));
  }

  return el('div', {class: 'comment-wrap'}, [
    el('div', {class: 'photo', title: comment.author.name}, [
      el('div', {class: 'avatar', style: `background-image: url('${comment.author.pic}')`})
    ]),
    el('div', {class: 'comment-block'}, [
      el('p', {class: 'comment-text'}, [commentText]),
      el('div', {class: 'bottom-comment'}, [
        el('div', {class: 'comment-date'}, new Date(comment.date).toLocaleString('ru-Ru')),
        el('ul', {class: 'comment-actions'}, [
          el('li', {class: 'complain'}, 'Пожаловаться'),
          el('li', {class: 'reply'}, 'Ответить')
        ])
      ])
    ]),
  ]);
}

fetch('https://neto-api.herokuapp.com/comments')
  .then(res => res.json())
  .then(showComments);
