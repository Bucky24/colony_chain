import { Canvas, Rect, Line } from "@bucky24/react-canvas";
import { Map, Layer, LayerImage, Cell } from "@bucky24/react-canvas-map";
import { PlanetDataInstance } from "../data/planet";
import { BuildingDataInstance } from "../data/building";
import { BUILDING_IMAGES, CONNECTION_TO } from "../types";

export default function PlanetMap({ planetId, onSelect, select }) {
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
            if (!image) return null;

            return <LayerImage src={image} width={1} height={1} x={building.x} y={building.y} />
          })}
        </Layer>
        <Layer>
          <Cell
            x={0}
            y={0}
            width={0}
            height={0}
            cb={(dims, { getDims }) => {
              const lines = [];
              planet.buildings.forEach((buildingId) => {
                const building = BuildingDataInstance.get(buildingId);
                if (!building) {
                  return null;
                }

                const startDims = getDims(building.x, building.y, 0.5, 0.5);

                building.connections.forEach((connection) => {
                  if (connection.type === CONNECTION_TO) {
                    const otherBuilding = BuildingDataInstance.get(connection.otherId);
                    if (!otherBuilding) return;
                    const endDims = getDims(otherBuilding.x, otherBuilding.y, 0.5, 0.5);

                    lines.push(<Line
                      x={startDims.x + startDims.width}
                      y={startDims.y + startDims.height}
                      x2={endDims.x + endDims.width}
                      y2={endDims.y + endDims.height}
                      color='#f00'
                    />);
                  }
                });
              });

              return lines;
            }}
          ></Cell>
        </Layer>
        <Layer>
          {select && <Cell
            x={select.x}
            y={select.y}
            width={1}
            height={1}
            cb={(dims) => {
              return <Rect x={dims.x} y={dims.y} x2={dims.x+dims.width} y2={dims.y+dims.height} color='#0f0' fill={false} />
            }}
          />}
        </Layer>
      </Map>
    </Canvas>
  </div>
}