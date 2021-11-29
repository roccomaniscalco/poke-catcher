import { Client } from "discord.js";
import dotenv from "dotenv";

import user from "./userBot.js";
import getPokemonName from "./imageSearch.js";

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  console.log("\x1b[32m", "PokéCatcher Active", "\x1b[0m");
});

let isGettingPokemonName = false;
pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    // is a wild pokémon
    if (message.embeds[0]?.title.includes("pokémon has appeared!")) {
      isGettingPokemonName = true;
      const pokemonImageUrl = message.embeds[0].image.url;
      const pokemonName = await getPokemonName(pokemonImageUrl);
      user.catchPokemon(pokemonName);
      isGettingPokemonName = false;
      user.spamMessage();
    }
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    if (message.content == "spam" && !isGettingPokemonName) {
      user.spamMessage();
    }
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
