import { Client } from "discord.js";
import dotenv from "dotenv";
import {
  handleCaughtPokemon,
  handleHint,
  handleReady,
  handleSpam,
  handleStop,
  handleWildPokemon,
} from "./handlers.js";

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  handleReady();
});

pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    if (message.embeds[0]?.title?.includes("pokémon has appeared!")) {
      handleWildPokemon(message.embeds[0].title);
    } else if (message.content.includes("The pokémon is")) {
      handleHint(message.content);
    } else if (message.content.includes("You caught a level")) {
      handleCaughtPokemon(message.content);
    }
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    if (message.content === "spam") {
      handleSpam();
    } else if (message.content === "stop") {
      handleStop();
    }
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
