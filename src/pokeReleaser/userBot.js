import robot from "robotjs";
import debounce from "../util/debounce.js";

const viewPokemon = debounce((pageNumber) => {
  robot.typeString(`p!pokemon ${pageNumber}`);
  robot.keyTap("enter");
}, 5000);

const releasePokemon = debounce((pokemonIdsToRelease) => {
  robot.typeString(`p!release ${pokemonIdsToRelease.join(" ")}`);
  robot.keyTap("enter");
}, 3000);

const confirmRelease = () => {
  robot.keyTap("up");
  for (let i = 0; i < 6; i++) {
    robot.keyTap("tab");
  }
  robot.keyTap("enter");
};

const user = { viewPokemon, releasePokemon, confirmRelease };
export default user;
