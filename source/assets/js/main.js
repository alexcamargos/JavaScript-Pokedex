const POKEAPI_LIMIT = 8; // Quantity of pokemons per request.
const MAX_RECORDS = 151; // Quantity of pokemons to load of PokeAPI.

const loadMoreButton = document.getElementById('load-more');

let POKEAPI_OFFSET = 0; // Offset of the first request.

async function loadPokemons(offset, limit) {
    pokeAPI.getPokemons(offset, limit).then((pokemons) => {
        createPokemonList(pokemons);
    });
}

// ao carregar a página, chamar a função createPokemonList
window.addEventListener('load', async () => {
    await loadPokemons();
});

async function doPokeAPIRequest() {
    POKEAPI_OFFSET += POKEAPI_LIMIT;

    const quantityNextRequest = POKEAPI_OFFSET + POKEAPI_LIMIT;
    if (quantityNextRequest >= MAX_RECORDS) {
        const newLimit = MAX_RECORDS - POKEAPI_OFFSET;

        await loadPokemons(POKEAPI_OFFSET, newLimit);

        loadMoreButton.disabled = true;
    } else {
        await loadPokemons(POKEAPI_OFFSET, POKEAPI_LIMIT);
    }
}

loadMoreButton.addEventListener('click', async () => {
    doPokeAPIRequest();
});

// TODO: Desabilitado durante o desenvolvimento, para limitar a quantidade de requisições.
// window.addEventListener('scroll', async () => {
//     const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

//     if (clientHeight + scrollTop >= scrollHeight - 5) {
//         doPokeAPIRequest();
//     }
// });
