import { BuildingDataInstance } from "../data/building";
import { PlanetDataInstance } from "../data/planet";
import { SystemDataInstance } from "../data/system";
import { CONNECTION_FROM } from "../types";
import buildingData from '../buildingData.json';

export default function runTick(tick) {
  const systems = SystemDataInstance.getAll();

  for (const system of systems) {
    const planetIds = system.planets;

    for (const planetId of planetIds) {
      const planet = PlanetDataInstance.get(planetId);
      if (!planet) continue;

      const buildingQueue = [];
      for (const buildingId of planet.buildings) {
        buildingQueue.push({
          buildingId,
          count: 0,
        });
      }

      while (queue.length > 0) {
        const queueData = buildingQueue.unshift();

        const building = BuildingDataInstance.get(queueData.buildingId);

        const buildingConfig = buildingData[building.type];
        const levelConfig = buildingConfig.levels[building.level];

        let waitingOnConnections = false;
        let totalToConnections = 0;
        for (const connection of building.connections) {
          if (connection.type === CONNECTION_FROM) {
            totalToConnections++;
            continue;
          }
          const otherBuilding = BuildingDataInstance.get(connection.otherId);
          if (!otherBuilding) {
            waitingOnConnections = true;
            break;
          }

          const otherBuildingConfig = buildingData[otherBuilding.type];
          // vaults always give us the previous tick's output so we don't need to wait
          // for it to be processed
          if (otherBuildingConfig.type !== "vault") {
            if (!otherBuilding.output || otherBuilding.output.tick !== tick) {
              waitingOnConnections = true;
              break;
            }
          }
        }

        if (waitingOnConnections && data.count > 4) {
          // if we've got nore to process and this is not our 5th time processing
          // then kick it to the back of the queue to give more time to the system
          buildingQueue.push({
            ...data,
            count: count + 1,
          });
          continue;
        }

        // if we got here, we're either in a loop or we have all our connections ready
        // first let's see how many resources we have available to us

        const availableResources = {};
        for (const connection of building.connections) {
          if (connection.type === CONNECTION_FROM) continue;
          const otherBuilding = BuildingDataInstance.get(connection.otherId);
          if (!otherBuilding) {
            continue;
          }

          const otherOutput = undefined;
          otherOutput = otherBuilding.output.perConnection || {};

          for (const type in otherOutput) {
            if (!availableResources[type]) availableResources[type] = 0;
            availableResources[type] += otherBuilding[type];
          }
        }

        if (levelConfig.generates) {
          // next compare this to our desired resources to see what percentage we meet
          const percentRequiredMet = {};
          for (const key in levelConfig.requires) {
            percentRequiredMet[key] = {
              desired: levelConfig.requires[key],
              has: availableResources[key] || 0,
            };

            percentRequiredMet[key].percent = Math.max(1, percentRequiredMet.has / percentRequiredMet.desired);
          }

          // the percent we can generate is based on the lowest percent of resources we have available
          let lowestPercent = 1;
          for (const key in percentRequiredMet) {
            lowestPercent = Math.min(lowestPercent, percentRequiredMet[key].percent);
          }

          // now figure out exactly how much we can generate
          const canGenerate = {};
          for (const key in levelConfig.generates) {
            let generateAmount = levelConfig.generates[key] * lowestPercent;
            if (levelConfig.generatesMin?.[key]) {
              generatesAmount = Math.max(levelConfig.generatesMin[key], generateAmount);
            }

            canGenerate[key] = generatesAmount;
          }

          // this becomes our new output. Now we need to split it evenly among all our "to" connections
          const generatePerConnection = {};
          for (const key in canGenerate) {
            generatePerConnection[key] = canGenerate[key] / totalToConnections;
          }

          building.output = {
            tick,
            perConnection: generatePerConnection,
          };
        } else if (levelConfig.capacity) {
          // in this case we store up to the capacity of the first type of resource
          const resourceKeys = Object.keys(availableResources);
          if (resourceKeys.length > 0) {
            const first = resourceKeys[0];
            const totalAmount = Math.min(levelConfig.capacity, availableResources[first]);

            building.output = {
              tick,
              // vaults will always use the previous tick for current tick output
              perConnection: building.output?.perConnection,
              next: { [first]: totalAmount / totalToConnections },
            }
          }
        }
      }

      // once we're done, update the vault data to the next generation
      for (const buildingId of planet.buildings) {
        const building = BuildingDataInstance.get(buildingId);
        if (!building) continue;

        if (building.output.next) {
          building.output = {
            tick,
            perConnection: building.output.next,
          };
        }
      }
    }
  }
}