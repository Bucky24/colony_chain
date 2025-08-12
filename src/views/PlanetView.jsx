import { useNavigate, useParams } from "react-router-dom";
import { SystemDataInstance } from "../data/system";
import { PlanetDataInstance } from "../data/planet";
import PlanetMap from "../components/PlanetMap";
import { useContext, useState } from "react";
import { BuildingDataInstance } from "../data/building";
import { BUILDING_TYPES } from "../types";
import DataContext from "../contexts/DataContext";

const SELECT_MODE = 'select';
const CONNECT_MODE = 'connect';

export default function PlanetView() {
  const { systemId, id } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [selectedBuildingType, setSelectedBuildingType] = useState(null);
  const [mode, setMode] = useState(SELECT_MODE);

  const system = SystemDataInstance.get(systemId);

  if (!system) {
    navigate("/");
    return;
  }

  const planet = PlanetDataInstance.get(id);

  if (!planet) {
    navigate(`/system/${systemId}`);
    return;
  }

  let selectedBuilding = null;
  if (selected) {
    for (const buildingId of planet.buildings) {
      const building = BuildingDataInstance.get(buildingId);
      if (building.x === selected.x && building.y === selected.y) {
        selectedBuilding = building;
      }
    }
  }

  return <div style={{
    display: 'flex',
    flexDirection: 'row',
  }}>
    <div style={{
      flexBasis: 150,
      flexShrink: 0,
    }}>
      <h2>{system.name}<br/>{planet.name}</h2>
      <h3>Stats</h3>
      <table>
        <tbody>
          <tr>
            <td>Type</td>
            <td>{planet.type}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style={{
      flexGrow: 1,
    }}>
      <PlanetMap
        planetId={id}
        onSelect={(x, y) => {
          if (mode === SELECT_MODE) {
            setSelected({ x, y });
          } else if (mode === CONNECT_MODE) {
            const buildingAt = PlanetDataInstance.getBuildingAtLocation(id, x, y);

            if (buildingAt) {
              BuildingDataInstance.connectBuildings(selectedBuilding.id, buildingAt.id);
            }

            setMode(SELECT_MODE);
          }
        }}
        select={selected}
      />
    </div>
    <div style={{
      flexBasis: 150,
      flexShrink: 0,
    }}>
      {selected && <div>
        <h3>Cell {selected.x},{selected.y}</h3>
        {selectedBuilding && <div>
          <h3>{selectedBuilding.type}</h3>
          <h3>Connections:</h3>
          {selectedBuilding.connections.map((connection) => {
            const otherBuilding = BuildingDataInstance.get(connection.otherId);

            if (!otherBuilding) return null;

            return <div>{otherBuilding.type} at ({otherBuilding.x},{otherBuilding.y})</div>
          })}
          <button onClick={() => {
            setMode(CONNECT_MODE);
          }}>Add Connection</button>
        </div>}
        {!selectedBuilding && <div>
          <h3>No building</h3>
          <select value={selectedBuildingType} onChange={e => setSelectedBuildingType(e.target.value)}>
            <option value=''>Select</option>
            {Object.keys(BUILDING_TYPES).map((type) => {
              return <option value={type}>{BUILDING_TYPES[type]}</option>
            })}
          </select>
          <button onClick={() => {
            PlanetDataInstance.buildBuilding(id, selectedBuildingType, selected.x, selected.y);
          }}>Build</button>
        </div>}
      </div>}
    </div>
  </div>
}