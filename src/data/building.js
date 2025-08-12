import { v4 } from "uuid";
import Data from "./base";

class BuildingData extends Data {
  createBuilding(type, x, y) {
    const newBuilding = {
      id: v4(),
      type,
      x,
      y,
    };

    this.set(newBuilding.id, newBuilding);

    return newBuilding.id;
  }
}

export const BuildingDataInstance = new BuildingData();