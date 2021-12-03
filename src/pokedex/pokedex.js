import fs from "fs";

const _readPokedex = () => {
  return JSON.parse(fs.readFileSync("./src/pokedex/pokedex.json", "utf-8"));
};

const _pokemonMatchesHint = (pokemon, hint) => {
  if (pokemon.length != hint.length) return false;
  return [...hint].every((char, i) => char == pokemon[i] || char == "_");
};

const addPokemon = (pokemon) => {
  fs.writeFileSync(
    "./src/pokedex/pokedex.json",
    JSON.stringify([..._readPokedex(), pokemon])
  );
};

const findMatchingPokemon = (hint) => {
  return _readPokedex().filter((pokemon) => _pokemonMatchesHint(pokemon, hint));
};

const pokedex = { addPokemon, findMatchingPokemon };
export default pokedex;
