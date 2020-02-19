import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Tabs from './tabs';
import Weather from './weather';
import Autocomplete from './autocomplete';

const namesArr = [
  "Albus",
  "Draco",
  "Fred",
  "George",
  "Ginny",
  "Harry",
  "Hermione",
  "Hagrid",
  "Ron",
  "Severus"
]

const tabsArr = [
  { title: "One", content: "Pane 1" },
  { title: "Two", content: "Pane 2" },
  { title: "Three", content: "Pane 3" }
]

function Root() {
  return (
    <div>
      <Clock />
      <Tabs alltabs={tabsArr}/>
      <Weather />
      <Autocomplete allNames={namesArr}/>
    </div>
  )
}

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
