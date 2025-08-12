import { Link } from "react-router-dom";
import { SystemDataInstance } from "../data/system"

export default function GalaxyView() {
  const systems = SystemDataInstance.getAll();

  return <div>
    <h2>Systems</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
        {systems.map((system) => {
          return <Link to={`/system/${system.id}`}>{system.name}</Link>
        })}
      </div>
  </div>
}