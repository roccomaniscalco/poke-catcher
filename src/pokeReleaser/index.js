import { Client } from "discord.js";
import dotenv from "dotenv";
import handler from "./handler.js";

// parse environment variables
dotenv.config();

// create a Client instance (bot) to interact with the Discord server
const pokeCatcher = new Client();

pokeCatcher.on("ready", async () => {
  handler.onReady();
});

pokeCatcher.on("message", async (message) => {
  // is a Pokétwo message
  if (message.author.username === "Pokétwo") {
    // if (message.embeds[0]?.title === "Your pokémon")
    //   handler.onViewingPokemon(message.embeds[0]);
    // else if (message.content === "No pokémon found.")
    //   handler.onStoppedViewingPokemon();
    console.log(message.embeds[0]?.fields)
  }

  // is a user message
  else if (message.author.id === process.env.USER_ID) {
    if (message.content == "clean") handler.onClean();
  }
});

// establish connection to the Discord server via bot key
pokeCatcher.login(process.env.BOT_KEY);
