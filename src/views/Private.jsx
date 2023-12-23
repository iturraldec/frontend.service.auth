import { LOGOUT } from "config/paths";
import { Link } from "react-router-dom";

function Private() {
  return (
    <div>
      <h1>Mi ruta privada</h1>
      <Link to={LOGOUT}>Cerrar sesión</Link>
    </div>
  );
}

export default Private;