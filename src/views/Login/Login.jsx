import { useAuthContext } from "contexts/authContext";
import { useState } from "react";
import { Alert } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  const { login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(false);

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(email, password);
    setErrorMsg(true);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sing In</h3>

          {errorMsg && <Alert variant="danger">Credenciales incorrectas!</Alert>}

          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePasswordChange}
              required
            />
          </div>

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>

          <p className="forgot-password text-right">
            Recuperar <a href="#">password</a>
          </p>
        </div>
      </form>
    </div>
  );
}