class PokemonCard extends HTMLElement {
    // A Custom PokemonCard element.
    constructor() {
        super();

        // Create a shadow root.
        const shadowRoot = this.attachShadow({ mode: 'open' });

        // Get the attributes for the component.
        this.name = this.getAttribute('name');
        this.id = this.getAttribute('id');
        this.image = this.getAttribute('image');

        if (this.getAttribute('types').indexOf(',') != -1) {
            this.types = this.getAttribute('types').split(',');
        } else {
            this.types = [this.getAttribute('types')];
        }

        // Set the styles for the component.
        shadowRoot.appendChild(this.styleSheet());

        // Build the component.
        shadowRoot.appendChild(this.build());
    }

    __createPokemonCard() {
        // Create the card for the pokemon.

        let li = document.createElement('li');
        li.classList.add('pokemon');

        li.classList.add(`type-${this.types[0]}`);

        li.addEventListener('click', () => {
            pokemonDialog.show(pokemonsList.searchPokemonByID(parseInt(this.id)));
        });

        return li;
    }

    __createPokemonImage() {
        // Create the image for the pokemon.

        let div = document.createElement('div');
        div.classList.add('pokemon-image');

        let pokemonImage = document.createElement('img');
        pokemonImage.src = this.image;
        pokemonImage.alt = this.name;

        div.appendChild(pokemonImage);

        return div;
    }

    __createPokemonInformation() {
        // Create the information for the pokemon.

        let div = document.createElement('div');
        div.classList.add('pokemon-info');

        let pName = document.createElement('p');
        pName.classList.add('pokemon-name');
        pName.textContent = this.name;

        let pID = document.createElement('p');
        pID.classList.add('pokemon-id');
        pID.textContent = `# ${this.id}`;

        div.appendChild(pName);
        div.appendChild(pID);

        return div;
    }

    __createPokemonTypes() {
        let div = document.createElement('div');
        div.classList.add('pokemon-types');

        this.types.forEach((type) => {
            let span = document.createElement('span');
            span.classList.add('pill');
            span.classList.add(type);
            span.textContent = type;

            div.appendChild(span);
        });

        return div;
    }

    build() {
        let pokemonCard = this.__createPokemonCard();

        let pokemonContainer = document.createElement('div');
        pokemonContainer.classList.add('pokemon-container');

        let pokemonImage = this.__createPokemonImage();

        let pokemonInformation = this.__createPokemonInformation();

        let pokemonTypes = this.__createPokemonTypes();

        pokemonContainer.appendChild(pokemonImage);
        pokemonContainer.appendChild(pokemonInformation);
        pokemonContainer.appendChild(pokemonTypes);

        pokemonCard.appendChild(pokemonContainer);

        return pokemonCard;
    }

    styleSheet() {
        // Set the styles for the component.
        let style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '/assets/css/pokemon-card.min.css');

        return style;
    }
}

customElements.define('pokemon-card', PokemonCard);
