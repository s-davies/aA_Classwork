import React from 'react'
import ReactDOM from 'react-dom';
import { fetchAllPokemon, fetchPokemon } from './util/api_util';
import { receiveAllPokemon, requestAllPokemon, receivePokemon, requestPokemon } from './actions/pokemon_actions';
import configureStore from './store/store';
import selectAllPokemon from './reducers/selectors';
import Root from './components/root';
import { HashRouter, Route } from "react-router-dom";


document.addEventListener('DOMContentLoaded', () => {
    const rootEl = document.getElementById('root')
    window.fetchAllPokemon = fetchAllPokemon
    window.receiveAllPokemon = receiveAllPokemon
    const store = configureStore()
    window.store = store
    window.getState = store.getState
    window.dispatch = store.dispatch
    window.requestAllPokemon = requestAllPokemon
    window.selectAllPokemon = selectAllPokemon
    window.fetchPokemon = fetchPokemon
    window.requestPokemon = requestPokemon

    ReactDOM.render( <Root store={store} /> , rootEl )
})