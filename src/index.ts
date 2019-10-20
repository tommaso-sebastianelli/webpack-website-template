function component() {
    const element = document.createElement('div');
    element.innerText = "Hello World";
    return element;
  }

  document.body.appendChild(component());
