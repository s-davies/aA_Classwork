const DOMNodeCollection = require('./dom_node_collection.js');

let funcsArr = [];

window.addEventListener('DOMContentLoaded', (event) => {
    funcsArr.forEach(el => el());
});

const $l = function (arg) {
    if (typeof arg === "string") {
       const nodeList = document.querySelectorAll(arg);
       let eles = Array.from(nodeList);
        return new DOMNodeCollection(eles);
    } else if (arg instanceof HTMLElement) {
        let htmlElements = [arg];
        return new DOMNodeCollection(htmlElements);
    } else if (arg instanceof Function) {
        funcsArr.push(arg);
    }
    
};

const sayHi = $l(() => {console.log('hi')});

window.$l = $l;