import { v4 } from "uuid";
import { randomPlanetName } from "../utils";
import Data from "./base";
import { BuildingDataInstance } from "./building";

class PlanetData extends Data {
  createPlanet(type) {
    const newPlanet = {
      id: v4(),
      type,
      buildings: [],
      name: randomPlanetName(),
    };

    this.set(newPlanet.id, newPlanet);

    return newPlanet.id;
  }

  buildBuilding(planetId, buildingType, x, y) {
    const planet = this.get(planetId);

    if (!planet) return;

    if (!buildingType) return;

    for (const buildingId of planet.buildings) {
      const building = BuildingDataInstance.get(buildingId);
      if (building.x === x && building.y === y) {
        return;
      }
    }

    const newId = BuildingDataInstance.createBuilding(buildingType, x, y);

    planet.buildings.push(newId);
    this.emit('change', {});
  }

  getBuildingAtLocation(planetId, x, y) {
    const planet = this.get(planetId);

    if (!planet) return;

    for (const buildingId of planet.buildings) {
      const building = BuildingDataInstance.get(buildingId);
      if (building.x === x && building.y === y) {
        return building;
      }
    }

    return;
  }
}

export const PlanetDataInstance = new PlanetData();