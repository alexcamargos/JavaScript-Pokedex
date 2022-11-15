// -------------------------------------------------------------------------------------------------
// Name: pokemon.js
// Version: 0.0.2
//
// Summary: JavaScript Pokedex
//
// Author: Alexsander Lopes Camargos
// Author-email: alcamargos@vivaldi.net
//
// License: MIT
// -------------------------------------------------------------------------------------------------

// Pokemon Object.
class Pokemon {
    constructor(
        name,
        id,
        image,
        types,
        vitality,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
        abilities,
        category,
        height,
        weight
    ) {
        this.name = name;
        this.id = id;
        this.image = image;
        this.types = types;
        this.vitality = vitality;
        this.attack = attack;
        this.defense = defense;
        this.speed = speed;
        this.specialAttack = specialAttack;
        this.specialDefense = specialDefense;
        this.abilities = abilities;
        this.category = category;
        this.height = height;
        this.weight = weight;
    }
}
