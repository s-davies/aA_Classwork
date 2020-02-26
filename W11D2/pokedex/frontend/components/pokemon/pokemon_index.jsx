import React from 'react'
import PokemonIndexItem from './pokemon_index_item'
import PokemonDetailContainer from './pokemon_detail_container'
import { HashRouter, Route } from 'react-router-dom'
class PokemonIndex extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.requestAllPokemon();
    }

    render(){
        return (
            <section className="pokedex">
                <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer}/>
                <ul>
                    {this.props.pokemon.map(poke => (
                        < PokemonIndexItem poke={poke} key={poke.id} />
                    ))}

                </ul>
            </section>
        )
    }
}

export default PokemonIndex