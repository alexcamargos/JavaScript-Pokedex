// -------------------------------------------------------------------------------------------------
// Name: main.js
// Version: 0.0.2
//
// Summary: JavaScript Pokedex
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

const POKEAPI_LIMIT = 8; // Quantity of pokemons per request.
const MAX_RECORDS = 151; // Quantity of pokemons to load of PokeAPI.
let POKEAPI_OFFSET = 0; // Offset of the first request.

const loadMoreButton = document.getElementById('load-more');

// Armazena informações dos Pokemons.
let pokemonsList = {
    pokemons: [], // Lista de Pokemons.

    addPokemon: function (pokemon) {
        // Adiciona um Pokemon na lista.
        this.pokemons.push(pokemon);
    },

    searchPokemon: function (id) {
        // Busca um Pokemon pelo ID.
        return this.pokemons.find((pokemon) => pokemon.id === id);
    },
};

// Pokemon Dialog Object.
let pokemonDialog = {
    dialog: document.getElementById('pokemon-dialog'), // Dialog element.
    dialogOverlay: document.getElementById('dialog-overlay'), // Dialog overlay element.

    // Show the dialog.
    show: function (pokemon) {
        populateDialog(pokemon); // Populate the dialog with the Pokemon information.

        this.dialog.show();
        this.dialogOverlay.classList.add('active');
    },

    // Hide the dialog.
    hide: function () {
        this.dialog.close();
        this.dialogOverlay.classList.remove('active');
    },
};

// Load the firsts pokemons.
async function loadPokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons) => {
        createPokemonList(pokemons);
    });
}

// Do the request to PokeAPI.
async function doPokeAPIRequest() {
    POKEAPI_OFFSET += POKEAPI_LIMIT;
    const quantityNextRequest = POKEAPI_OFFSET + POKEAPI_LIMIT;

    if (quantityNextRequest >= MAX_RECORDS) {
        const newLimit = MAX_RECORDS - POKEAPI_OFFSET;

        await loadPokemons(POKEAPI_OFFSET, newLimit);

        loadMoreButton.disabled = true; // Disable the load more button.
    } else {
        await loadPokemons(POKEAPI_OFFSET, POKEAPI_LIMIT);
    }
}

// Quando a página carregar, carrega os primeiros Pokemons.
window.addEventListener('load', async () => {
    await loadPokemons();
});

// Quando o usuário clicar no botão de carregar mais Pokemons, carrega mais Pokemons.
loadMoreButton.addEventListener('click', async () => {
    doPokeAPIRequest();
});

// Quando a página chegar ao final, carrega mais Pokemons.
window.addEventListener('scroll', async () => {
    // TODO: Desabilitado durante o desenvolvimento, para limitar a quantidade de requisições.
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        doPokeAPIRequest();
    }
});

document.getElementById('dialog-overlay').addEventListener('click', () => {
    pokemonDialog.hide();
});

document.querySelector('div.back-button').addEventListener('click', () => {
    pokemonDialog.hide();
});
