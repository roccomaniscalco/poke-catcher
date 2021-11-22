const { Client } = require("discord.js");
require("dotenv").config();

// create a Client instance (bot) to interact with the Discord server
const bot = new Client();

bot.on("ready", () => {
  // log in green then switches to white for subsequent logs
  console.log("\x1b[32m", "• PokéCatcher Active •", "\x1b[0m");
});

bot.on("message", (message) => {
  // if a message embed title is "A wild pokémon has appeared!"
  if (message.embeds[0]?.title === "A wild pokémon has appeared!") {
    message.channel.send(message.embeds[0].image.url);
  }
  // if a message content is "ping"
  if (message.content === "ping") {
    message.channel.send("pong");
  }
});

// establish connection to the Discord server via a bot key
bot.login(process.env.BOT_KEY);
