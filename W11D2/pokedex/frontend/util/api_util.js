import React from 'react'

export const fetchAllPokemon = () => (
    $.ajax({
        url: '/api/pokemon'
    })
)

export const fetchPokemon = (id) => (
    $.ajax({
        url: `/api/pokemon/${id}`
    })
)



