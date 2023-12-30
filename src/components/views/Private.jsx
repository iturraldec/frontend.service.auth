import { LOGOUT } from "config/paths";
import { Link } from "react-router-dom";
import Template from "components/Layout/Template";

function Private() {
  return (
    <Template>
      <div>
        <h1>Mi ruta privada</h1>
        <Link to={LOGOUT}>Cerrar sesión</Link>
      </div>
    </Template>
  );
}

export default Private;