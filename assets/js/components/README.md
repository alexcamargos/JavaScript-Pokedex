# PokemonCard

Renderiza um card de acordo com os atributos recebidos de um determinado Pokémon.

## Atributos

| Nome          | Tipo          | Descrição                           |
| ------------- |:-------------:|:----------------------------------- |
| name          | string        | Nome do Pokémon                     |
| id            | string        | Número do Pokémon na Pokédex        |
| image         | string        | Imagem que representa o Pokémon     |
| types         | string        | Tipo(s) do Pokémon                  |

## Utilização

O card precisa receber os atributos `name`, `id`, `image`, e `types` contendo as informações que serão renderizadas do Pokémon.

```html
<pokemon-card id="25" name="Pikachu" types="electric}" image="url"></pokemon-card>`
```
