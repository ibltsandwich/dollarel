const DomNodeCollection = require("./dom_node_collection");

let funcs = [];
let ready = false;

window.$l = (selector) => {
  if (typeof arg === 'function') {
    return documentReadyCallback(arg);
  } else if (typeof arg === 'string') {
    return cssHtmlCallback(arg);
  } else if (arg instanceof HTMLElement) {
    return cssHtmlCallback(arg);
  }
}

$l.extend = (target, ...args) => {
  args.forEach(obj => {
    for (let prop in obj) {
      target[prop] = obj[prop];
    }
  });
  return target;
}

$l.ajax = () => {
  
}

documentReadyCallback = (arg) => {
  if (ready === false) {
    funcs.push(arg); 
  }
}

cssHtmlCallback = (arg) => {
  const nodes = document.querySelectorAll(arg);
  const nodeArr = Array.from(nodes);
  return new DOMNodeCollection(nodeArr);
}

document.addEventListener('DOMContentLoaded', () => {
  ready = true;
  funcs.forEach(func => func());
  funcs = [];
});
