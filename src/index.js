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
  // if (arg === 'document')
  // console.log(arg)
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

document.addEventListener('DOMContentLoaded', () => {
  const root = $l("#root");
  root.append("<img class='logo' src='./images/Rick_and_Morty.svg'></img>")
  root.append("<h1 class='episode-list-header'>EPISODE LIST</h1>");
  root.append("<div class='episode-list-container'></div>")

  $l(".episode-list-container").append("<ul class='episode-list'></ul>");

})

$l.ajax({
  method: 'GET',
  url: 'https://rickandmortyapi.com/api/episode'
})
  .then(response => response.results.forEach(episode => {
    showEpisode(episode);
  }))
  .then(() => 
    $l.ajax({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/episode/?page=2'
    })
    .then(response => response.results.forEach(episode => {
      showEpisode(episode);
    })))



showEpisode = (episode) => {
  $l(".episode-list").append(
    `<li class='episode-item' id='${episode.id}'>
      <div class='ep-info'><h2>Title</h2>
      <h2 id="episode-name">${episode.name}</h2></div>

      <div class='ep-info'><h2>Episode</h2>
      <h2 id="episode-number">${episode.episode}</h2></div>

      <div class='ep-info'><h3>Air Date</h3>
      <h3 id="episode-date">${episode.air_date}</h3></div>
    </li>`
  )
}


retrieveCharacters = (episode) => {
  const charList = $l(`.character-list${episode.id}`)
  console.log(charList)
  episode.characters.forEach(char => {
    $l.ajax({
      method: 'GET',
      url: `${char}`
    }).then(response => {
      characters.push(response);
      charList.append(
        `<li><img src=${response.image}></img></li>`
      )}
    )
  })
}
