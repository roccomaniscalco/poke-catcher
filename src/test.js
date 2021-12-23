import myPokemon from "./pokeReleaser/myPokemon.js";

const pokemonToRelease = myPokemon.getPokemonToRelease();

const idsToRelease = pokemonToRelease.map(({ id }) => id);
console.log(idsToRelease.join(" "));
