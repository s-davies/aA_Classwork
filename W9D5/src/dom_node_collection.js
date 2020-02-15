class DOMNodeCollection {
    constructor (htmlElements) {
        // debugger
        this.htmlElements = htmlElements;
    }

    html(str) {
        if (str) {
            this.htmlElements.forEach( el => {
                el.innerHTML = str;
            });
            return this;
        } else {
            // debugger
            const innerStuff = this.htmlElements[0].innerHTML;
            return innerStuff;
        }
        
    }

    empty() {
        this.htmlElements.forEach(el => {
            el.innerHTML = "";
        });
    }

    append(arg) {
        this.htmlElements.forEach(el => {
            if (typeof arg === "string") {
                el.innerHTML += arg;
            } else if (arg instanceof HTMLElement) {
                el.innerHTML += arg.outerHTML;
            } else if (arg instanceof DOMNodeCollection) {
                el.innerHTML += arg.htmlElements.map(el => el.outerHTML).join("");
            }
            
        });
        return this;
    }

    attr(attribute, arg) {
        if (!arg) {
           return this.htmlElements[0].getAttribute(attribute);
        } else if (typeof arg === "string") {
            this.htmlElements.forEach(el => {
                el.setAttribute(attribute, arg);
            });
        } else if (arg instanceof Function) {
            this.htmlElements.forEach((el, idx) => {
                let att = el.getAttribute(attribute);
                el.setAttribute(attribute, arg(idx, att));
            });
        }
    }

    addClass(className) {
        this.htmlElements.forEach( el => {
            el.classList.add(className);
        });
    }

    removeClass(className) {
        this.htmlElements.forEach(el => {
            el.classList.remove(className);
        });
    }

    children() {
        // debugger
        let childs = [];
        this.htmlElements.forEach( el => {
            childs = childs.concat(Array.from(el.children));
        });
        return new DOMNodeCollection(childs);
    }

    parent() {
        // debugger
        let parents = [];
        this.htmlElements.forEach(el => {
            if (parents.indexOf(el.parentElement) === -1) {
                // debugger
                parents.push(el.parentElement);
            }
        });
        return new DOMNodeCollection(parents);
    }

    find(selector) {
        let selected = [];
        this.htmlElements.forEach(el => {
            selected = selected.concat(Array.from(el.querySelectorAll(selector)));
        });
        return selected;
    }

    remove() {
        let store = this.htmlElements.slice();
        this.htmlElements.forEach( el => {
            el.parentNode.removeChild(el);
        });
        return store;
    }

    on(type, func) {
        this.htmlElements.forEach(el => {
            el.addEventListener(type, func);
        });
    }

    off(type, func) {
        this.htmlElements.forEach(el => {
            el.removeEventListener(type, func);
        });
    }
}

module.exports = DOMNodeCollection;