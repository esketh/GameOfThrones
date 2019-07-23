const GameOfThronesData = {
  data: [],
  init() {
    this.findAll();
  },
  elements: {
    gotCharactersDiv: document.querySelector('.flex-container'),
  },
  setData(gotCharacters) {
    this.characters = JSON.parse(gotCharacters);
    for (let i = 0; i < this.characters.length; i += 1) {
      this.characters[i].id = i + 1;
    }
    this.showAll();
  },
  showAll() {
    let figs = '';
    for (let i = 0; i < this.characters.length; i += 1) {
      if (this.characters[i].hasOwnProperty('dead') === false) {
        figs += this.createFig(this.characters[i]);
      }
    }
    // console.log(divs);
    this.elements.gotCharactersDiv.innerHTML += figs;
  },
  findAll() {
    const request = new XMLHttpRequest();
    request.onload = () => {
      this.setData(request.responseText);
    };
    request.onerror = () => {
      alert('Hiba a betöltéskor');
    };
    request.open('GET', '/json/got.json'); // '/json/got.json'
    request.send();
  },
  createFig(item) {
    return `<figure class="item">
  <img src="${item.portrait}" alt="${item.name}" onclick="GameOfThronesData.moreData(${item.id})">
  <figcaption>${item.name}</figcaption>
  </figure>`;
  },
  moreData(id) {
    // console.log(arguments);
    for (let i = 0; i < this.characters.length; i += 1) {
      if (this.characters[i].id === id) {
        document.querySelector('.navSearch').innerHTML = `<div class="moreData">
    <img src="${this.characters[i].picture}" alt="${this.characters[i].name}" class="moreData--img">
    <br>
    Name: "${this.characters[i].name}"
    <br>
    Bio: "${this.characters[i].bio}"</div>`;
      }
    }
  },
};
GameOfThronesData.init();

function getData(url, callbackFunc) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function getCharacters() {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', '/json/got.json', true);
  xhttp.send();
}

// function successAjax(xhttp) {
//   GameOfThronesData = JSON.parse(xhttp.responseText);
// }

// getData('/json/got.json', successAjax);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */

// function createFig(item) {
//   const objKeys = Object.keys(this.data[0]);
//   for (let i = 0; i < objKeys.length; i += 1) {
//     const figureTag = `<figure class="item">s
//   <img src="${item.portrait}" alt="${item.name}">
//   <figcaption>${item.name}</figcaption>
//   </figure>`;

//     document.querySelector('.flex-container').innerHTML += figureTag;
//   }
// }
