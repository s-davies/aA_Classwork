
const dogs = {
  "Corgi": "https://www.akc.org/dog-breeds/cardigan-welsh-corgi/",
  "Australian Shepherd": "https://www.akc.org/dog-breeds/australian-shepherd/",
  "Affenpinscher": "https://www.akc.org/dog-breeds/affenpinscher/",
  "American Staffordshire Terrier": "https://www.akc.org/dog-breeds/american-staffordshire-terrier/",
  "Tosa": "https://www.akc.org/dog-breeds/tosa/",
  "Labrador Retriever": "https://www.akc.org/dog-breeds/labrador-retriever/",
  "French Bulldog": "https://www.akc.org/dog-breeds/french-bulldog/" 
};

function dogLinkCreator() {
  let dogLis = [];
  for (let i = 0; i < Object.keys(dogs).length; i++) {
    // const dogLink = dogs[i];
    let aTag = document.createElement('a');
    aTag.innerHTML = Object.keys(dogs)[i];
    aTag.href = Object.values(dogs)[i];
    let liTag = document.createElement('li');
    liTag.classList.add('dog-link');
    liTag.classList.add('hidden');
    liTag.append(aTag);
    dogLis.push(liTag);
  }
  return dogLis;
}

function attachDogLinks() {
  let dogLinks = dogLinkCreator();
  let ul = document.getElementsByClassName('drop-down-dog-list')[0];
  for (let i = 0; i < dogLinks.length; i++) {
    const dogLink = dogLinks[i];
    ul.append(dogLink);
  }
}

function handleEnter() {
  let lis = document.getElementsByClassName('dog-link');
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.classList.remove('hidden');
  }
}

function handleLeave() {
  let lis = document.getElementsByClassName('dog-link');
  for (let i = 0; i < lis.length; i++) {
    const li = lis[i];
    li.classList.add('hidden');
  }
}

const h3 = document.querySelector('h3');
const nav = document.getElementsByClassName('drop-down-dog-nav')[0];
h3.addEventListener("mouseenter", handleEnter);
nav.addEventListener("mouseleave", handleLeave);
attachDogLinks();
