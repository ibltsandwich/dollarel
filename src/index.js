const DOMNodeCollection = require("./dom_node_collection");

let funcs = [];
let ready = false;

const $l = (selector) => {
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
let characters = [];
let episodes = [];

document.addEventListener('DOMContentLoaded', () => {
  const root = $l("#root");
  root.append("<div class='header' id='header'></div>")
  root.append("<img class='logo' src='./images/Rick_and_Morty.svg'></img>")
  root.append("<h1 class='episode-list-header'>EPISODE LIST</h1>");
  root.append("<div class='episode-list-container'></div>")
  $l("#header").append("<ul class='personal-links' id='personal-links'></ul>")
  $l("#personal-links").append("<li class='links' id='portfolio'><a href='https://ibltsandwich.github.io/' target=_blank'><i class='fas fa-home'></i></a><li>")
  $l("#personal-links").append("<li class='links' id='linkedin'><a href='https://www.linkedin.com/in/brian-lee-blt/' target=_blank'><i class='fab fa-linkedin'></i></a><li>")
  $l("#personal-links").append("<li class='links' id='github'><a href='https://github.com/ibltsandwich' target=_blank'><i class='fab fa-github-square'></i></a><li>")
  $l("#personal-links").append("<li class='links' id='email'><a href='mailto:brianlee100891@gmail.com' target=_blank'><i class='fas fa-envelope'></i></a><li>")
  $l(".links").attr
  $l(".episode-list-container").append("<ul class='episode-list'></ul>");

})

$l.ajax({
  method: 'GET',
  url: 'https://rickandmortyapi.com/api/episode'
})
  .then(response => response.results.forEach(episode => {
    episodes.push(episode);
    showEpisode(episode);
  }))
  .then(() => 
    $l.ajax({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/episode/?page=2'
    })
    .then(response => response.results.forEach(episode => {
      episodes.push(episode);
      showEpisode(episode);
    }))).then(response => {
      retrieveCharacters();
    })

showEpisode = (episode) => {
  $l(".episode-list").append(
    `<li class='episode-item' id='${episode.id}'>
      <div class='ep-info'><h2>Title</h2>
      <h2 id="episode-name">${episode.name}</h2></div>

      <div class='ep-info'><h2>Episode</h2>
      <h2 id="episode-number">${episode.episode}</h2></div>

      <div class='ep-info'><h3>Air Date</h3>
      <h3 id="episode-date">${episode.air_date}</h3></div>

      <h3 id='character-header'>Characters</h3>
      <div id='character-list${episode.id}' class='character-list'>
      </div>
    </li>`
  )
}

retrieveCharacters = () => {
  for (let i = 1; i <= 25; i++) {
    $l.ajax({
      method: 'GET',
      url: `https://rickandmortyapi.com/api/character/?page=${i}`
    }).then(response => {
      characters.push(response);
      response.results.forEach(character => {
        episodes.forEach(episode => {
          if (episode.characters.includes(character.url)){
            $l(`#character-list${episode.id}`).append(
              `<div class='character-item'>
                <span class='character-name'>${character.name}</span>
                <img class='character-image' src=${character.image} alt=${character.name} width="75"/>
              </div>`
            )
          }
        })
      })
    })
  }
}