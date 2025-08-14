import { v4 } from "uuid";
import Data from "./base";
import { CONNECTION_FROM, CONNECTION_TO } from "../types";

class BuildingData extends Data {
  processData(building) {
    return {
      level: 1,
      ...building,
    };
  }

  createBuilding(type, x, y) {
    const newBuilding = {
      id: v4(),
      type,
      x,
      y,
      connections: [],
      output: {},
      level: 1,
    };

    this.set(newBuilding.id, newBuilding);

    return newBuilding.id;
  }

  connectBuildings(from, to) {
    const buildingFrom = this.get(from);
    const buildingTo = this.get(to);

    if (!buildingFrom) {
      console.error(`Can't find building ${buildingFrom}`);
      return;
    }

    if (!buildingTo) {
      console.error(`Can't find building ${buildingTo}`);
      return;
    }

    let fromConnect = false;
    for (const connection of buildingFrom.connections) {
      if (connection.otherId === to) {
        fromConnect = true;
      }
    }

    if (!fromConnect) {
      buildingFrom.connections.push({
        otherId: to,
        type: CONNECTION_TO,
      });
    }

    let toConnect = false;
    for (const connection of buildingTo.connections) {
      if (connection.otherId === from) {
        toConnect = true;
      }
    }

    if (!toConnect) {
      buildingTo.connections.push({
        otherId: from,
        type: CONNECTION_FROM,
      });
    }

    this.emit('change', {});
  }

  disconnectBuildings(from, to) {
    const buildingFrom = this.get(from);
    const buildingTo = this.get(to);

    if (!buildingFrom) {
      console.error(`Can't find building ${buildingFrom}`);
      return;
    }

    if (!buildingTo) {
      console.error(`Can't find building ${buildingTo}`);
      return;
    }

    for (let i=0;i<buildingFrom.connections.length;i++) {
      const connection = buildingFrom.connections[i];
      if (connection.otherId === to) {
        buildingFrom.connections.splice(i, 1);
        break;
      }
    }

    for (let i=0;i<buildingTo.connections.length;i++) {
      const connection = buildingTo.connections[i];
      if (connection.otherId === from) {
        buildingTo.connections.splice(i, 1);
        break;
      }
    }

    this.emit('change', {});
  }
}

export const BuildingDataInstance = new BuildingData();