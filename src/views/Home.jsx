import { LOGOUT } from "config/paths";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to={LOGOUT}>Cerrar sesión</Link>
    </div>
  );
}

export default Home;