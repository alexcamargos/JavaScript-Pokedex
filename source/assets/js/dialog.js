// -------------------------------------------------------------------------------------------------
// Name: dialog.js
// Version: 0.0.1
//
// Summary: JavaScript Pokedex
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

function transformStatsValueProportionally(value) {
    return (value / 100) * 16;
}

function populateDialog(pokemon) {
    let pokemonInformation = document.querySelector('div.pokemon-information');
    pokemonInformation.classList.add(`type-${pokemon.types[0]}`);

    let pokemonName = document.getElementById('pokemon-name');
    let pokeminID = document.getElementById('pokemon-id');
    let pokemonImage = document.getElementById('pokemon-image');
    let pokemonHeight = document.getElementById('pokemon-height');
    let pokemonWeight = document.getElementById('pokemon-weight');
    let pokemonCategory = document.getElementById('pokemon-category');

    pokemonName.textContent = pokemon.name;
    pokeminID.textContent = `# ${pokemon.id}`;
    pokemonImage.src = pokemon.image;
    pokemonHeight.textContent = `${pokemon.height} dm`;
    pokemonWeight.textContent = `${pokemon.weight} hg`;
    pokemonCategory.textContent = pokemon.category;

    let pokemonAbilities = document.getElementById('pokemon-abilities');
    pokemonAbilities.innerHTML = '<span>Habilidade</span>';
    pokemon.abilities.forEach((ability) => {
        let li = document.createElement('li');
        li.textContent = ability;
        pokemonAbilities.appendChild(li);
    });

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
