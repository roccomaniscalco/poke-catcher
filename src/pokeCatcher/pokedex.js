import fs from "fs";
import log from "../util/log.js";

const POKEDEX_PATH = "./database/pokedex.json";

const readPokedex = () => {
  return JSON.parse(fs.readFileSync(POKEDEX_PATH, "utf-8"));
};

const pokemonMatchesHint = (pokemon, hint) => {
  if (pokemon.length != hint.length) return false;
  return [...hint].every((char, i) => char == pokemon[i] || char == "_");
};

const addPokemon = (pokemon) => {
  const pokedex = readPokedex();
  if (pokedex.includes(pokemon)) return;

  fs.writeFileSync(POKEDEX_PATH, JSON.stringify([...pokedex, pokemon]));
  log.info(`• added ${pokemon} to pokédex`);
};

const determinePokemon = (hint) => {
  return readPokedex().filter((pokemon) => pokemonMatchesHint(pokemon, hint));
};

const pokedex = { addPokemon, determinePokemon };
export default pokedex;
