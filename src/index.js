import { Client } from "discord.js";
import dotenv from "dotenv";

import user from "./userBot.js";
import getPokemonName from "../deprecated/imageSearch.js";

// PokéCatcher state
const state = {
  isGettingPokemonName: false,
  pokemonName: "",
};

const handleWildPokemon = async (message) => {
  const pokemonImageUrl = message.embeds[0].image.url;
  console.log("\x1b[2m", `• image url: ${pokemonImageUrl}`, "\x1b[0m");
  state.isGettingPokemonName = true;

  try {
    const pokemonName = await getPokemonName(pokemonImageUrl);
    state.pokemonName = pokemonName;
    state.isGettingPokemonName = false;
    user.catchPokemon(pokemonName);
    user.spamMessage();
  } catch (err) {
    process.exitCode = 1;
  }
};

const handleCaughtPokemon = () => {
  console.log(
    "\x1b[32m",
    `Success: ${state.pokemonName} was caught!`,
    "\x1b[0m"
  );
};

const handleWrongPokemon = () => {
  console.log(
    "\x1b[31m",
    `Failure: ${state.pokemonName} was not the correct pokémon`,
    "\x1b[0m"
  );
};

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  console.log("\x1b[32m", "PokéCatcher Active", "\x1b[0m");
});

pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    // is a wild pokémon
    if (message.embeds[0]?.title.includes("pokémon has appeared!")) {
      handleWildPokemon(message);
    } else if (message.content.includes("You caught a level")) {
      handleCaughtPokemon();
    } else if (message.content == "That is the wrong pokémon!") {
      handleWrongPokemon();
    }
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    // is a "spam" message
    if (message.content == "spam" && !state.isGettingPokemonName) {
      user.spamMessage();
    }
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
