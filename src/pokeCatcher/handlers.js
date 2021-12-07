import log from "../util/log.js";
import user from "./userBot.js";
import pokedex from "./pokedex.js";

const handleFledPokemon = (title) => {
  const pokemon = title
    .replace("Wild ", "")
    .replace(" fled. A new wild pokémon has appeared!", "");

  log.error(`Wild ${pokemon} fled!`);
  pokedex.addPokemon(pokemon);
};

export const handleReady = () => {
  log.success("PokéCatcher Active");
};

export const handleWildPokemon = (title) => {
  user.askForHint();
  if (title.includes("fled")) handleFledPokemon(title);
};

export const handleHint = (content) => {
  const hint = content.slice(15, content.length - 1).replace(/\\/g, "");
  const pokemonArr = pokedex.determinePokemon(hint);
  pokemonArr.forEach((pokemon) => user.catchPokemon(pokemon));

  log.info(
    `• [${pokemonArr.length}] pokémon determined${
      pokemonArr.length > 0 && `: ${pokemonArr.join(", ")}`
    }`
  );
};

export const handleCaughtPokemon = (content) => {
  const levelPokemon = content.match(/(?<=level )(.*?)(?=\!)/)[1];
  log.success(`Level ${levelPokemon} was caught!`);
};

export const handleSpam = () => {
  user.spam();
};
