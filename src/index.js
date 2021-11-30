import { Client } from "discord.js";
import dotenv from "dotenv";
import {
  handleCaughtPokemon,
  handleHint,
  handlePokedex,
  handleSpam,
  handleWildPokemon,
  handleWrongPokemon,
} from "./handlers.js";

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
      handleWildPokemon(message.embeds[0].title);
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
      handleSpam();
    }
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
