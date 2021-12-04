import fs from "fs";

const readPokedex = () => {
  return JSON.parse(fs.readFileSync("./src/pokedex/pokedex.json", "utf-8"));
};

const pokemonMatchesHint = (pokemon, hint) => {
  if (pokemon.length != hint.length) return false;
  return [...hint].every((char, i) => char == pokemon[i] || char == "_");
};

const addPokemon = (pokemon) => {
  fs.writeFileSync(
    "./src/pokedex/pokedex.json",
    JSON.stringify([...readPokedex(), pokemon])
  );
};

const determinePokemon = (hint) => {
  return readPokedex().filter((pokemon) => pokemonMatchesHint(pokemon, hint));
};

const pokedex = { addPokemon, determinePokemon };
export default pokedex;

