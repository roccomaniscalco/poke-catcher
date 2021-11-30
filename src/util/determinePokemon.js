import { pokedex } from "./pokedex.js";

const determinePokemon = (hint) => {
  for (const pokemon of pokedex) {
    if (pokemonMatchesHint(pokemon, hint)) return pokemon;
  }
  return undefined;
};

const pokemonMatchesHint = (pokemon, hint) => {
  if (pokemon.length != hint.length) return false;
  return [...hint].every((char, i) => char == pokemon[i] || char == "_");
};

export default determinePokemon
