import { Link, useNavigate, useParams } from "react-router-dom";
import { SystemDataInstance } from "../data/system";
import { PlanetDataInstance } from "../data/planet";

export default function SystemView() {
  const { id } = useParams();
  const navigate = useNavigate();

  const system = SystemDataInstance.get(id);

  if (!system) {
    navigate("/");
    return;
  };

  return <div>
    <h2>{system.name}</h2>
    <h3>Planets</h3>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
    }}>
      {system.planets.map((planetId) => {
        const planet = PlanetDataInstance.get(planetId);
        return <Link to={`/system/${id}/planet/${planet.id}`}>{planet.name}</Link>
      })}
    </div>
  </div>
}