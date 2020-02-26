import { fetchAllPokemon } from "../util/api_util";


const selectAllPokemon = (state) => (
    Object.values(state.entities.pokemon)
)

export default selectAllPokemon