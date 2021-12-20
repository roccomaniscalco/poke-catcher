import fs from "fs";

const MY_POKEMON_PATH = "./database/myPokemon.json";
const RELEASE_WHITELIST = "./database/releaseWhitelist.json";

const _getUniquePokemonNames = () => {
  const pokemonNames = Object.values(_readMyPokemon()).map(
    (pokemon) => pokemon.name
  );
  return Array.from(new Set(pokemonNames));
};

const _getReleaseWhitelistedPokemonNames = () => {
  const releaseWhitelistSet = new Set(_readReleaseWhitelist());
  return _getUniquePokemonNames().filter((uniquePokemonName) =>
    releaseWhitelistSet.has(uniquePokemonName)
  );
};

const _readReleaseWhitelist = () => {
  return JSON.parse(fs.readFileSync(RELEASE_WHITELIST, "utf-8"));
};

const _readMyPokemon = () => {
  return JSON.parse(fs.readFileSync(MY_POKEMON_PATH, "utf-8"));
};

const writeMyPokemon = (myPokemon) => {
  fs.writeFileSync(MY_POKEMON_PATH, JSON.stringify(myPokemon));
};

const getPokemonToRelease = () => {
  const myPokemon = _readMyPokemon();

  return _getReleaseWhitelistedPokemonNames().reduce(
    (pokemonToRelease, uniquePokemonName) => {
      // collect all pokémon duplicates with the same name
      const pokemonDuplicates = myPokemon.filter(
        ({ name }) => uniquePokemonName === name
      );

      // determine which pokemon to keep from duplicates
      const pokemonToKeep = pokemonDuplicates.reduce(
        (pokemonToKeep, nextPokemon) =>
          nextPokemon.iv > pokemonToKeep.iv ? nextPokemon : pokemonToKeep
      );

      // push duplicates that are not meant to be kept
      for (const pokemon of pokemonDuplicates) {
        if (pokemon !== pokemonToKeep) pokemonToRelease.push(pokemon);
      }
      return pokemonToRelease;
    },
    []
  );
};

const myPokemon = { writeMyPokemon, getPokemonToRelease };
export default myPokemon;
