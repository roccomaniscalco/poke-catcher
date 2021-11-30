import robot from "robotjs";

// type spam message
const spamMessage = () => {
  robot.typeString("spam");
  robot.keyTap("enter");
};

// type catch command
const catchPokemon = async (pokemonName) => {
  robot.typeString(`p!catch ${pokemonName}`);
  robot.keyTap("enter");
};

const user = { catchPokemon, spamMessage };
export default user;
