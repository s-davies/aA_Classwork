import React from 'react'

export const fetchAllPokemon = () => (
    $.ajax({
        url: '/api/pokemon'
    })
)



