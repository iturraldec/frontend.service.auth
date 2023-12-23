import { useAuthContext } from "contexts/authContext";
import { useState } from "react";

function Login() {
  const {login} = useAuthContext();
  const [password, setPassword] = useState('');

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if(password === "hola") {
      login();
    }
  }

  return (
    <div>
      login
      <form onSubmit={handleSubmit}>
        <input type="text" value={password} onChange={handlePasswordChange} />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;