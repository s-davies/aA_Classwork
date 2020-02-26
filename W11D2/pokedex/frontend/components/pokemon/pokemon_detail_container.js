import { connect } from 'react-redux'
import { requestPokemon } from '../../actions/pokemon_actions'
import PokemonDetail from './pokemon_detail'

const mSTP = (state) => ({
    pokemon: Object.values(state.entities.pokemon)[0]
})

const mDTP = (dispatch) => ({
    
    requestPokemon: (id) => dispatch(requestPokemon(id))
})

export default connect(mSTP, mDTP)(PokemonDetail)