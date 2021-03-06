class DOMNodeCollection {
  constructor(elements) {
    this.elements = elements
  }

  html(string) {
    if (string) {
      this.elements.forEach(el => {
        el.innerHTML = string
      })
    } else {
      return this.elements[0].innerHTML
    }
  }

  empty() {
    this.html("")
  }

  append(arg) {
    if (arg instanceof DOMNodeCollection) {
      arg.forEach(argEl => {
        this.elements.forEach(thisEl => {
          thisEl.innerHTML += argEl.outerHTML;
        });
      });
    } else {
      this.elements.forEach(el => {
        el.innerHTML += arg
      })
    }
  }

  attr(string) {
    for (let i = 0; i < this.elements[0].attributes.length; i++) {
      if (string === this.elements[0].attributes[i].name) {
        return this.elements[0].attributes[i].value
      }
    }
  }

  addClass(string) {
    this.elements.forEach(el => {
      el.classList.add(string);
    });
  }

  removeClass(string) {
    this.elements.forEach(el => {
      el.classList.remove(string);
    });
  }


  children() {
    const result = [];
    this.elements.forEach(el => {
      for (let i = 0; i < el.children.length; i++) {
        result.push(el.children[i]);
      }
    });
    return new DOMNodeCollection(result);
  }

  parent() {
    const result = [];
    this.elements.forEach(el => {
      result.push(el.parentNode);
    });

    return new DOMNodeCollection(result);
  }

  find(selector) {
    let result = [];
    this.elements.forEach((el) => {
      const descendants = Array.from(el.querySelectorAll(selector));
      result = result.concat(descendants);
    });

    return new DOMNodeCollection(result);
  }

  remove() {
    this.elements.forEach((el) => {
      el.remove("outerHTML");
    });

    this.elements = [];
  }

  on(event, callback) {
    this.elements.forEach((el) => {
      el.addEventListener(event, callback);
      el.callback = callback;
    });
  }

  off(event) {
    this.elements.forEach((el) => {
      el.removeEventListener(event, el.callback);
    });
  }
}


module.exports = DOMNodeCollection;