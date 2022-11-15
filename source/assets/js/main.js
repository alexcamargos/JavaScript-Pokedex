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

    searchPokemonByID: function (id) {
        // Busca um Pokemon pelo ID.
        return this.pokemons.find((pokemon) => pokemon.id === id);
    },

    searchPokemonByName: function (pokemonName) {
        // Busca um Pokemon pelo nome.
        return this.pokemons.find((pokemon) => pokemon.name === pokemonName);
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
        renderPokemonList(pokemons);
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

// Realiza um requisição ao PokeAPI usando o nome do Pokemon.
function searchPokemon() {
    const searchInput = document.getElementById('search-pokemon');
    const searchValue = searchInput.value.toLowerCase();

    const searchResult = pokemonsList.searchPokemonByName(searchValue);

    // Se o Pokemon ainda não foi requisitado, faz a requisição.
    if (searchResult !== undefined) {
        pokemonDialog.show(searchResult);
    } else {
        // Faça uma busca no PokeAPI.
        pokeAPI.searchPokemon(searchValue).then((pokemon) => {
            // If PokeAPi returns 404, the pokemon was not found.
            let searchErrorSpan = document.getElementById('search-error');
            if (pokemon) {
                pokemonDialog.show(pokemon);
                if (!searchErrorSpan.classList.contains('hidden')) {
                    document.getElementById('search-error').classList.add('hidden');
                }
            } else {
                if (searchErrorSpan.classList.contains('hidden')) {
                    document.getElementById('search-error').classList.remove('hidden');
                }
            }
        });
    }
}

// Quando a página carregar, carrega os primeiros Pokemons.
window.addEventListener('load', async () => {
    await loadPokemons();
});

// Quando a página chegar ao final, carrega mais Pokemons.
window.addEventListener('scroll', async () => {
    // TODO: Desabilitado durante o desenvolvimento, para limitar a quantidade de requisições.
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
        doPokeAPIRequest();
    }
});

// Ativa o campo busca apos o usuário digitar algo.
document.getElementById('search-pokemon').addEventListener('keyup', () => {
    const searchButton = document.getElementById('search-button');

    if (searchButton.disabled) {
        searchButton.disabled = false;
    }
});

// Quando o usuário clicar no botão de busca, busca o Pokemon.
document.getElementById('search-button').addEventListener('click', () => {
    searchPokemon();
});

// Quando o usuário clicar ENTER com o foco dentro do campo de busca, busca o Pokemon.
document.getElementById('search-pokemon').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

// Fecha o dialog overlay ao clicar fora da dialog.
document.getElementById('dialog-overlay').addEventListener('click', () => {
    pokemonDialog.hide();
});
// Fecha o dialog overlay ao clicar no botão de voltar.
document.querySelector('div.back-button').addEventListener('click', () => {
    pokemonDialog.hide();
});
// Fecha o dialog overlay ao clicar no no botão ESC.
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        pokemonDialog.hide();
    }
});
