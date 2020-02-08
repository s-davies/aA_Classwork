Function.prototype.myDebounce = function (interval) {
  let startTime = Date.now();
  let timer;
  setTimeout(this(...args), interval);
  const debFunc = (...args) => {
    let currentTime = Date.now();
    if (currentTime - startTime < interval) {
      this(...args);
    } else {

    }
    clearTimeout(timer);
    setTimeout(this(...args), interval);
    startTime = currentTime;
     
  };
  return debFunc;
};

class SearchBar {
  constructor() {
    this.query = "";

    this.type = this.type.bind(this);
    this.search = this.search.bind(this);
  }

  type(letter) {
    this.query += letter;
    this.search();
  }

  search() {
    console.log(`searching for ${this.query}`);
  }
}

const searchBar = new SearchBar();
searchBar.search = searchBar.search.myDebounce(500);

