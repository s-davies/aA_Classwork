import {fetchAllPokemon} from '../util/api_util'

export const RECEIVE_ALL_POKEMON = 'RECEIVE_ALL_POKEMON'


export const receiveAllPokemon = pokemons => ({
    type: RECEIVE_ALL_POKEMON,
    pokemons
})


