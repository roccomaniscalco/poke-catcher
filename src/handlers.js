import log from "./util/log.js";
import user from "./userBot.js";
import { determinePokemon } from "./pokedex/Pokedex.js";

export const handleReady = () => {
  log.success("PokéCatcher Active");
};

export const handleWildPokemon = (title) => {
  user.askForHint();
  if (title.includes("fled"))
    log.error(title.replace(". A new wild pokémon has appeared", ""));
}

export const handleHint = (content) => {
  const hint = content.substring(15, content.length - 1).replace(/\\/g, "");
  determinePokemon(hint).forEach((pokemon) => user.catchPokemon(pokemon));

  log.info(`• [${pokemonArr.length}] pokémon determined`);
  if (pokemonArr.length > 0) log.info(`• ${pokemonArr.toString()}`);
}

export const handleCaughtPokemon = (content) => {
  const pokemon = content.split(" ")[7].slice(0, -1);
  log.success(`${pokemon} was caught!`);
}

export const handleSpam = () => {
  user.spam();
}
