const DOMNodeCollection = require("./dom_node_collection");
const RMDemo = require('./rmdemo');

let funcs = [];
let ready = false;

$l = (selector) => {
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

  
  options = $l.extend(defaults, options);
  options.method = options.method.toUpperCase();
  
  
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(options.method, options.url);
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.response));
      } else {
        reject(JSON.parse(xhr.response));
      }
    };
    xhr.send();
  })
  return promise;
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


// Rick and Morty Demo

let ep1;
$l.ajax({
  method: 'GET',
  url: 'https://rickandmortyapi.com/api/episode'
})
  .then(response => ep1 = response)


showEpisode = (episode) => {
  const root = $l("#root");
}