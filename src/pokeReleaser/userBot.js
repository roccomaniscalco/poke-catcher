import robot from "robotjs";
import debounce from "../util/debounce.js";

const viewPokemon = debounce((pageNumber) => {
  robot.typeString(`p!pokemon ${pageNumber}`);
  robot.keyTap("enter");
}, 5000);

const confirmRelease = debounce(() => {
  robot.keyToggle("up", "down");
  for (let i = 0; i < 6; i++) {
    robot.keyTap("tab");
  }
  robot.keyTap("enter")
}, 5000);

const user = { viewPokemon, confirmRelease };
export default user;
