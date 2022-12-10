// -------------------------------------------------------------------------------------------------
// Name: render_dialog.js
// Version: 0.0.3
//
// Summary: JavaScript Pokedex
//         Renderiza o dialog com as informações do Pokemon.
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

// Transforma o valor de uma habilidade para a base 16.
function transformStatsValueProportionally(value) {
    return (value / 100) * 16;
}

// Transforma o peso do Pokemon para quilogramas.
function convertHectogramsToKilos(value) {
    return value / 10;
}

// Transforma a altura do Pokemon para metros.
function convertDecimetersToMetres(value) {
    return value / 10;
}

// Insere as informações do Pokemon no dialog.
function populateDialog(pokemon) {
    let pokemonInformation = document.querySelector('div.pokemon-information');

    // Remove as formatações de tipos anteriormente aplicadas.
    pokemonInformation.classList.forEach((className) => {
        if (className.startsWith('type-')) {
            pokemonInformation.classList.remove(className);
        }
    });

    // Aplica as formatações de tipos.
    pokemonInformation.classList.add(`type-${pokemon.types[0]}`);
    pokemonInformation.classList.add(`type-${pokemon.types[0]}-bg`);

    let pokemonName = document.getElementById('pokemon-name');
    let pokemonID = document.getElementById('pokemon-id');
    let pokemonImage = document.getElementById('pokemon-image');
    let pokemonHeight = document.getElementById('pokemon-height');
    let pokemonWeight = document.getElementById('pokemon-weight');
    let pokemonCategory = document.getElementById('pokemon-category');

    pokemonName.textContent = pokemon.name;
    pokemonID.textContent = `# ${pokemon.id}`;
    pokemonImage.src = pokemon.image;
    pokemonHeight.textContent = `${convertDecimetersToMetres(pokemon.height)} m`;
    pokemonWeight.textContent = `${convertHectogramsToKilos(pokemon.weight)} kg`;
    pokemonCategory.textContent = pokemon.category;

    // Popula as informações das habilidades.
    let pokemonAbilities = document.getElementById('pokemon-abilities');
    pokemonAbilities.innerHTML = '<span>Ability</span>';
    pokemon.abilities.forEach((ability) => {
        let li = document.createElement('span');
        li.textContent = ability;
        pokemonAbilities.appendChild(li);
    });

    // Popula as informações da cadeia evolutiva.
    let pokemonEvolution = document.getElementById('pokemon-evolutions-list');
    pokemonEvolution.innerHTML = '';

    // Search for the evolution chain of the Pokemon.
    pokemon.evolutionChain.forEach((evolution) => {
        // Do a PokeApi search for the Pokemon evolution.
        let pokemonChain = pokeAPI.searchPokemon(evolution);

        // Resolve the promise and populate the evolution chain.
        pokemonChain
            .then((response) => response)
            .then((pokemon) => {
                let li = document.createElement('li');
                // Set the order of the Pokemon in the evolution chain.
                li.setAttribute('style', `order: ${pokemon.id};`);
                li.classList.add('evolution');
                li.innerHTML += `<img src="${pokemon.image}" alt="${pokemon.name}"><span> # ${pokemon.id} - ${pokemon.name}</span>`;
                pokemonEvolution.appendChild(li);
            });
    });

    // Popula as informações dos tipos.
    let pokemonTypes = document.getElementById('pokemon-types');
    pokemonTypes.innerHTML = '';
    pokemon.types.forEach((type) => {
        let li = document.createElement('li');
        li.classList.add(`type-${type}`);
        li.textContent = type;
        pokemonTypes.appendChild(li);
    });

    vitalityValue = parseInt(transformStatsValueProportionally(pokemon.vitality));
    attackValue = parseInt(transformStatsValueProportionally(pokemon.attack));
    defenseValue = parseInt(transformStatsValueProportionally(pokemon.defense));
    speedValue = parseInt(transformStatsValueProportionally(pokemon.speed));
    specialAttackValue = parseInt(transformStatsValueProportionally(pokemon.specialAttack));
    specialDefenseValue = parseInt(transformStatsValueProportionally(pokemon.specialDefense));

    // Popula as informações da vitalidade.
    let pokemonVitality = document.getElementById('pokemon-vitality');
    pokemonVitality.innerHTML = '<h4>Vitality</h4>';
    for (let i = 0; i < vitalityValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonVitality.appendChild(span);
    }
    if (pokemonVitality.children.length < 16) {
        for (let i = 0; i < 16 - vitalityValue; i++) {
            let span = document.createElement('span');
            pokemonVitality.appendChild(span);
        }
    }

    // Popula as informações do ataque.
    let pokemonAttack = document.getElementById('pokemon-attack');
    pokemonAttack.innerHTML = '<h4>Attack</h4>';
    for (let i = 0; i < attackValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonAttack.appendChild(span);
    }
    if (pokemonAttack.children.length < 16) {
        for (let i = 0; i < 16 - attackValue; i++) {
            let span = document.createElement('span');
            pokemonAttack.appendChild(span);
        }
    }

    // Popula as informações da defesa.
    let pokemonDefense = document.getElementById('pokemon-defense');
    pokemonDefense.innerHTML = '<h4>Defense</h4>';
    for (let i = 0; i < defenseValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonDefense.appendChild(span);
    }
    if (pokemonDefense.children.length < 16) {
        for (let i = 0; i < 16 - defenseValue; i++) {
            let span = document.createElement('span');
            pokemonDefense.appendChild(span);
        }
    }

    // Popula as informações da velocidade.
    let pokemonSpeed = document.getElementById('pokemon-speed');
    pokemonSpeed.innerHTML = '<h4>Speed</h4>';
    for (let i = 0; i < speedValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonSpeed.appendChild(span);
    }
    if (pokemonSpeed.children.length < 16) {
        for (let i = 0; i < 16 - speedValue; i++) {
            let span = document.createElement('span');
            pokemonSpeed.appendChild(span);
        }
    }

    // Popula as informações do ataque especial.
    let pokemonSpecialAttack = document.getElementById('pokemon-special-attack');
    pokemonSpecialAttack.innerHTML = '<h4>Special Attack</h4>';
    for (let i = 0; i < specialAttackValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonSpecialAttack.appendChild(span);
    }
    if (pokemonSpecialAttack.children.length < 16) {
        for (let i = 0; i < 16 - specialAttackValue; i++) {
            let span = document.createElement('span');
            pokemonSpecialAttack.appendChild(span);
        }
    }

    // Popula as informações da defesa especial.
    let pokemonSpecialDefense = document.getElementById('pokemon-special-defense');
    pokemonSpecialDefense.innerHTML = '<h4>Special Defense</h4>';
    for (let i = 0; i < specialDefenseValue; i++) {
        let span = document.createElement('span');
        span.classList.add('filled');
        pokemonSpecialDefense.appendChild(span);
    }
    if (pokemonSpecialDefense.children.length < 16) {
        for (let i = 0; i < 16 - specialDefenseValue; i++) {
            let span = document.createElement('span');
            pokemonSpecialDefense.appendChild(span);
        }
    }
}
