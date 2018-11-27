const DomNodeCollection = require("./dom_node_collection");

let funcs = [];
let ready = false;

window.$l = (selector) => {
  if (typeof selector === 'function') {
    return documentReadyCallback(selector);
  } else if (typeof selector === 'string') {
    return cssHtmlCallback(selector);
  } else if (selector instanceof HTMLElement) {
    return cssHtmlCallback(selector);
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

$l.ajax = (options) => {
  let defaults = {
    success: () => { }, error: () => { },
    url: "", method: 'GET',
    data: {}, contentType: 'HTML'
  };

  
  options = window.$l.extend(defaults, options);
  options.method = options.method.toUpperCase();
  
  
  const p = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(xhr.response);
      }
    };
    xhr.send(JSON.stringify(options.data));
  })
  return p;
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
