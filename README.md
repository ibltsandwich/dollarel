# dollarel

[Demo Live Link](http://ibltsandwich.github.io/dollarel)

dollarel is a library based on jQuery that allows for DOM manipulation and interaction.

Users are able to select elements on the page by their tags or class/ids and edit the HTML directly through the API.


## Selecting
Mounting to the window allows for testing in Chrome's developer tools.
```javascript
window.$l = (selector) => {
  if (typeof selector === 'function') {
    return documentReadyCallback(selector);
  } else if (typeof selector === 'string') {
    return cssHtmlCallback(selector);
  } else if (selector instanceof HTMLElement) {
    return cssHtmlCallback(selector);
  }
}
```

Depending on the type of selector provided by the user, a different callback is utilized to grab the proper element(s).
These are returned as an instance of a DOMNodeCollection which can be manipulated using the following methods:

### ```html```
If this method receives an argument, it will become the innerHTML of each of the elements in the collection.  
If it does not receive an argument, it returns the innerHTML of the first element in the array.


### ```empty```
Clears out the content(innerHTML) of all elements in the collection.

### ```append```
Appends the outerHTML of each element in the argument to the innerHTML of each element in the collection.

### ```remove```
Removes all HTML of all the elements in the collection from the DOM and removes all elements from the collection itself.

### ```attr```
Returns the attribute as specified in the argument.

### ```find```
Returns a collection of the elements, which match the provided selectors, and are descendants of the element on which the method was called.

### ```addClass```
Adds a class name to the selected element.

### ```removeClass```
Removes a class name from the selected element.

### ```children```
Returns a collection of all the children of all elements in the target collection.

### ```parent```
Returns a collection of all the parents of each element in the target collection.

### ```on```
Takes in two arguments, an event and a callback.  
Adds an event listener for each element in the collection.

### ```off```
Takes off the event listener, event, and callback from each element in the collection.
