import React from 'react'
import { Link } from "react-router-dom"

class PokemonIndexItem extends React.Component {
    constructor(props){
        super(props)
    }





    render(){
        return (

            <li className="pokemon-index-item">
                <Link to={`/pokemon/${this.props.poke.id}`}>
                <span>{this.props.poke.id}</span>
                <img src={this.props.poke.image_url} />
                <span>{this.props.poke.name}</span>

                </Link>

            </li>
        )
    }
}

export default PokemonIndexItem