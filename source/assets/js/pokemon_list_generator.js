// -------------------------------------------------------------------------------------------------
// Name: pokemon_list_generator.js
// Version: 0.0.1
//
// Summary: JavaScript Pokedex
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

// Cria o card do Pokemon.
function createPokemonCard(pokemon) {
    let li = document.createElement('li');
    li.classList.add('pokemon');
    li.classList.add(`type-${pokemon.types[0]}`);

    // Adiciona o evento de click no card do Pokemon.
    // Ao clicar no card, exibe o dialog com as informações do Pokemon.
    li.addEventListener('click', () => {
        pokemonDialog.show(pokemonsList.searchPokemon(pokemon.id));
    });

    return li;
}

// Cria a imagem do Pokemon.
function createPokemonImage(pokemon) {
    let div = document.createElement('div');
    div.classList.add('pokemon-image');

    let img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name;

    div.appendChild(img);

    return div;
}

// Cria as informações básicas do Pokemon.
function createPokemonInformation(pokemon) {
    let div = document.createElement('div');
    div.classList.add('pokemon-info');

    let pName = document.createElement('p');
    pName.classList.add('pokemon-name');
    pName.textContent = pokemon.name;

    let pID = document.createElement('p');
    pID.classList.add('pokemon-id');
    pID.textContent = `# ${pokemon.id}`;

    div.appendChild(pName);
    div.appendChild(pID);

    return div;
}

// Cria os tipos do Pokemon.
function createPokemonTypes(pokemon) {
    let div = document.createElement('div');
    div.classList.add('pokemon-types');

    pokemon.types.forEach((type) => {
        let span = document.createElement('span');
        span.classList.add('pill');
        span.classList.add(type);
        span.textContent = type;

        div.appendChild(span);
    });

    return div;
}

// Cria um campo de exibição de Pokemon.
function createPokemon(pokemon) {
    let pokemonCard = createPokemonCard(pokemon);

    let pokemonContainer = document.createElement('div');
    pokemonContainer.classList.add('pokemon-container');

    let pokemonImage = createPokemonImage(pokemon);
    let pokemonInformation = createPokemonInformation(pokemon);
    let pokemonTypes = createPokemonTypes(pokemon);

    pokemonContainer.appendChild(pokemonImage);
    pokemonContainer.appendChild(pokemonInformation);
    pokemonContainer.appendChild(pokemonTypes);

    pokemonCard.appendChild(pokemonContainer);

    return pokemonCard;
}

// Cria e exibe a lista de Pokemons.
function createPokemonList(pokemons) {
    // selecionar o elemento pela classe pokemons-list
    let pokemonList = document.querySelector('.pokemons-list');

    // Para cada pokemon, criar um card e adicionar na lista
    pokemons.forEach((pokemon) => {
        let pokemonCard = createPokemon(pokemon);
        pokemonList.appendChild(pokemonCard);
    });
}
