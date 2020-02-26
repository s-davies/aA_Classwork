import React from 'react';

class PokemonDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.requestPokemon(this.props.match.params.pokemonId)
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.props.requestPokemon(this.props.match.params.pokemonId)
        }
    }
    
    render() {
        let mvs;
        if (this.props.pokemon.moves) {
            mvs = this.props.pokemon.moves.join(", ")
        }
        return(
            <section className="pokemon-detail">
                {/* <img src="http://aa-pokedex.herokuapp.com/assets/pokemon-logo-e4fa62f7f4eb6a0d788d7cd65908c6be97f3066f8bb97a17e4707dd29f14445f.svg" alt="Copyright of Nintendo Pokemon"></img> */}
                <ul>
                    <li>{this.props.pokemon.name}</li>
                    <li>Type: {this.props.pokemon.poke_type}</li>
                    <li>Attack: {this.props.pokemon.attack}</li>
                    <li>Defense: {this.props.pokemon.defense}</li>
                    <li>Moves: {mvs}</li>
                </ul>
            </section>
        )
    }
}

export default PokemonDetail;