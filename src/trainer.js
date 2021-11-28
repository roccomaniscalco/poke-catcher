import robot from "robotjs";

const clearLine = () => {
  robot.keyToggle("command", "down");
  robot.keyTap("backspace");
  robot.keyToggle("command", "up");
};

// start search pokémon search (spamming text) interval
let spamInterval;
const startSearch = () => {
  spamInterval = setInterval(() => {
    robot.typeString("searching for pokémon...");
    robot.keyTap("enter");
  }, 2000);
};

// stop spam interval
const stopSearch = () => clearInterval(spamInterval);

// type catch command
const catchPokemon = (pokemonName) => {
  clearLine();
  robot.typeString(`p!catch ${pokemonName}`);
  robot.keyTap("enter");
};

const trainer = { startSearch, stopSearch, catchPokemon };
export default trainer;
