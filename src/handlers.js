import user from "./userBot.js";
import determinePokemon from "./util/determinePokemon.js";
import unescape from "./util/unescape.js";

export function handleWildPokemon(title) {
  if (title.includes("fled"))
    console.log(
      "\x1b[31m",
      title.replace(". A new wild pokémon has appeared!", ""),
      "\x1b[0m"
    );

  user.askForHint();
}

export function handleHint({ content }) {
  const hint = unescape(content.substring(15, content.length - 1));
  const pokemonArr = determinePokemon(hint);
  pokemonArr.forEach((pokemon) => user.catchPokemon(pokemon));

  console.log(
    "\x1b[2m",
    `• pokémon determined: ${pokemonArr.toString()}`,
    "\x1b[0m"
  );
}

export function handleCaughtPokemon({ content }) {
  const pokemon = content.split(" ")[7].slice(0, -1);
  console.log("\x1b[32m", `Success: ${pokemon} was caught!`, "\x1b[0m");
}

export function handleWrongPokemon() {
  console.log("\x1b[2m", "• attempt to catch failed", "\x1b[0m");
}

export function handlePokedex({ embeds }) {
  console.log(embeds[0]);
}

export function handleSpam() {
  user.spam();
}
