// -------------------------------------------------------------------------------------------------
// Name: render_pokemons.js
// Version: 0.0.2
//
// Summary: JavaScript Pokedex
//         Renderiza a lista de Pokemons.
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

// Cria um campo de exibição de Pokemon.
function createPokemon(pokemon) {
    return `<pokemon-card id="${pokemon.id}" name="${pokemon.name}" types="${pokemon.types.join(
        ','
    )}" image="${pokemon.image}"></pokemon-card>`;
}

// Cria e exibe a lista de Pokemons.
function renderPokemonList(pokemons) {
    // selecionar o elemento pela classe pokemons-list
    let pokemonList = document.querySelector('.pokemons-list');

    // Para cada pokemon, criar um card e adicionar na lista
    pokemons.forEach((pokemon) => {
        let pokemonCard = createPokemon(pokemon);
        pokemonList.innerHTML += pokemonCard;
    });
}
