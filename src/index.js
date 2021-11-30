import { Client } from "discord.js";
import dotenv from "dotenv";

import user from "./userBot.js";
import determinePokemon from "./util/determinePokemon.js";
import unescape from "./util/unescape.js";

const handleWildPokemon = (title) => {
  if (title.includes("fled"))
    console.log(
      "\x1b[31m",
      title.replace(". A new wild pokémon has appeared!", ""),
      "\x1b[0m"
    );

  user.askForHint();
};

const handleHint = ({ content }) => {
  const hint = unescape(content.substring(15, content.length - 1));
  const pokemonArr = determinePokemon(hint);
  pokemonArr.forEach((pokemon) => user.catchPokemon(pokemon));

  console.log(
    "\x1b[2m",
    `• pokémon determined: ${pokemonArr.toString()}`,
    "\x1b[0m"
  );
};

const handleCaughtPokemon = ({ content }) => {
  const pokemon = content.split(" ")[7].slice(0, -1);
  console.log("\x1b[32m", `Success: ${pokemon} was caught!`, "\x1b[0m");
};

const handleWrongPokemon = () => {
  console.log("\x1b[2m", "• attempt to catch failed", "\x1b[0m");
};

const handlePokedex = ({ embeds }) => {
  console.log(embeds[0]);
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
    console.log(message);
    // is a wild pokémon
    if (message.embeds[0]?.title?.includes("pokémon has appeared!")) {
      handleWildPokemon(message);
    } else if (message.content.includes("The pokémon is")) {
      handleHint(message);
    } else if (message.content.includes("You caught a level")) {
      handleCaughtPokemon(message);
    } else if (message.content == "That is the wrong pokémon!") {
      handleWrongPokemon();
    } else if (message.embeds[0]?.title == "Your pokédex") {
      handlePokedex(message);
    }
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    // is a "spam" message
    if (message.content == "spam") {
      user.spam();
    }
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
