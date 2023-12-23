import { useAuthContext } from "contexts/authContext";
import { useState } from "react";

function Login() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

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
        <p>Ingresa el correo</p>
        <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
        <p>Ingresa el password</p>
        <input type="text" value={password} onChange={handlePasswordChange} placeholder="Password" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

export default Login;