'use strict';

function createElement(node) {
  if (typeof node === 'string') {
    return document.createTextNode(node);
  } else if (typeof node === 'object') {
    const element = document.createElement(node.name);
    for (let prop in node.props) {
      element.setAttribute(prop, node.props[prop]);
    }
    let children = document.createDocumentFragment();
    for (let child of node.childs) {
      children.appendChild(createElement(child));
    }
    element.appendChild(children);
    return element;
  }
};
