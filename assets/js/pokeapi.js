// -------------------------------------------------------------------------------------------------
// Name: pokeapi.js
// Version: 0.0.2
//
// Summary: JavaScript Pokedex
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

const pokeAPI = {};

// Convert the PokeAPI Pokemon to a Pokemon Object.
function convertPokeApiToPokemon(pokeApiData) {
    const pokemon = new Pokemon();

    pokemon.name = pokeApiData.name;
    pokemon.id = pokeApiData.id;
    pokemon.image = pokeApiData.sprites.other.dream_world.front_default;
    pokemon.types = pokeApiData.types.map((type) => type.type.name);
    pokemon.vitality = pokeApiData.stats[0].base_stat;
    pokemon.attack = pokeApiData.stats[1].base_stat;
    pokemon.defense = pokeApiData.stats[2].base_stat;
    pokemon.speed = pokeApiData.stats[5].base_stat;
    pokemon.specialAttack = pokeApiData.stats[3].base_stat;
    pokemon.specialDefense = pokeApiData.stats[4].base_stat;
    pokemon.abilities = pokeApiData.abilities.map((ability) => ability.ability.name);
    pokemon.category = pokeApiData.species.name;
    pokemon.height = pokeApiData.height;
    pokemon.weight = pokeApiData.weight;
    pokemon.species = pokeApiData.species.url;
    // Set the array of evolution chain.
    pokemon.evolutionChain = pokeAPI
        .getEvolutionChain(pokemon.species)
        .then((evolutionChain) => (pokemon.evolutionChain = evolutionChain));

    // Add the Pokemon to the list.
    pokemonsList.addPokemon(pokemon);

    return pokemon;
}

// Request the Pokemon detail from PokeAPI.
pokeAPI.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon);
};

// Request the Pokemon evolution chain from PokeAPI.
pokeAPI.getEvolutionChain = (speciesURL) => {
    return fetch(speciesURL)
        .then((response) => response.json())
        .then((response) => response.evolution_chain.url)
        .then((evolutionChainURL) => fetch(evolutionChainURL))
        .then((response) => response.json())
        .then((response) => response.chain)
        .then((evolutionChain) => {
            let evolutionPath = [];
            evolutionPath.push(evolutionChain.species.name);
            evolutionChain.evolves_to.forEach((evolution) => {
                evolutionPath.push(evolution.species.name);
                evolution.evolves_to.forEach((evolution) => {
                    evolutionPath.push(evolution.species.name);
                });
            });
            return evolutionPath;
        });
};

// Request the Pokemon list from PokeAPI.
pokeAPI.getPokemons = (offset = POKEAPI_OFFSET, limit = POKEAPI_LIMIT) => {
    // Requisition points to the PokeAPI.
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .then((pokemons) => pokemons.map(pokeAPI.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};

// Request a single Pokemon from PokeAPI.
pokeAPI.searchPokemon = (pokemonName) => {
    // Requisition points to the PokeAPI.
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiToPokemon)
        .catch((error) => {
            // If the Pokemon is not found, return null.
            console.error(error);
            return false;
        });
};
