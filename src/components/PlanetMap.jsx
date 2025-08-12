import { Canvas } from "@bucky24/react-canvas";
import { Map, Layer, LayerImage } from "@bucky24/react-canvas-map";
import { PlanetDataInstance } from "../data/planet";
import { BuildingDataInstance } from "../data/building";
import { BUILDING_IMAGES } from "../types";

export default function PlanetMap({ planetId, onSelect }) {
  const planet = PlanetDataInstance.get(planetId);

  if (!planet) return;

  return <div>
    <Canvas width={400} height={400}>
      <Map
        x={0}
        y={0}
        width={300}
        height={300}
        onClick={(x, y) => {
          onSelect(x, y);
        }}
      >
        <Layer>
          {planet.buildings.map((buildingId) => {
            const building = BuildingDataInstance.get(buildingId);
            if (!building) {
              return null;
            }

            const image = BUILDING_IMAGES[building.type];
            console.log(building, image);
            if (!image) return null;

            return <LayerImage src={image} width={1} height={1} x={building.x} y={building.y} />
          })}
        </Layer>
      </Map>
    </Canvas>
  </div>
}