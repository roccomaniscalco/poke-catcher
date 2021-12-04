import log from "./util/log.js";
import user from "./userBot.js";
import pokedex from "./pokedex/pokedex.js";

const handleFledPokemon = (title) => {
  const pokemon = title
    .replace("Wild ", "")
    .replace(" fled. A new wild pokémon has appeared!", "");
  pokedex.addPokemon(pokemon);

  log.error(`Wild ${pokemon} fled!`);
  log.info(`• added ${pokemon} to pokédex`);
};

export const handleReady = () => {
  log.success("PokéCatcher Active");
};

export const handleWildPokemon = (title) => {
  user.askForHint();
  if (title.includes("fled")) handleFledPokemon(title);
};

export const handleHint = (content) => {
  const hint = content.substring(15, content.length - 1).replace(/\\/g, "");
  const pokemonArr = pokedex.determinePokemon(hint);
  pokemonArr.forEach((pokemon) => user.catchPokemon(pokemon));

  log.info(`• [${pokemonArr.length}] pokémon determined`);
  if (pokemonArr.length > 0) log.info(`• ${pokemonArr.toString()}`);
};

export const handleCaughtPokemon = (content) => {
  const pokemon = content.split(" ")[7].slice(0, -1);
  log.success(`${pokemon} was caught!`);
};

export const handleSpam = () => {
  user.spam();
};
