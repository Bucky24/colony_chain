import { v4 } from "uuid";
import { PLANET_TYPES } from "../types";
import { randomElement, randomPlanetName, randomStarName } from "../utils";
import Data from "./base";
import { PlanetDataInstance } from "./planet";

function generateSystem(planetCount) {
  const planets = [];

  for (let i=0;i<planetCount;i++) {
    const type = randomElement(Object.values(PLANET_TYPES));

    const newPlanet = PlanetDataInstance.createPlanet(type);

    planets.push(newPlanet);
  }

  return planets;
}

class SystemData extends Data {
  createSystem(planetCount) {
    const planets = generateSystem(planetCount);

    const newSystem = {
      name: randomStarName(),
      planets,
      id: v4(),
    };

    this.set(newSystem.id, newSystem);
  }
}

export const SystemDataInstance = new SystemData();