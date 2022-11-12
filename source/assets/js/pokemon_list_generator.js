function createPokemonCard(pokemon) {
    let li = document.createElement('li');
    li.classList.add('pokemon');
    li.classList.add(`type-${pokemon.types[0]}`);

    return li;
}

function createPokemonImage(pokemon) {
    let div = document.createElement('div');
    div.classList.add('pokemon-image');

    let img = document.createElement('img');
    img.src = pokemon.image;
    img.alt = pokemon.name;

    div.appendChild(img);

    return div;
}

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

function createPokemonList(pokemons) {
    // selecionar o elemento pela classe pokemons-list
    let pokemonList = document.querySelector('.pokemons-list');

    pokemons.forEach((pokemon) => {
        let pokemonCard = createPokemon(pokemon);
        pokemonList.appendChild(pokemonCard);
    });
}

// ao carregar a página, chamar a função createPokemonList
window.addEventListener('load', () => {
    createPokemonList(pokemons);
});
