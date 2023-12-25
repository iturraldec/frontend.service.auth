import { useAuthContext } from "contexts/authContext";
import { useState } from "react";
import { Alert, Form } from "react-bootstrap";
import "styles/Login.css";

export default function Login() {
  const { login }               = useAuthContext();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    login(email, password, setMessage);
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sing In</h3>

          {message.length > 0 && <Alert className="mb-3" variant="danger">{message}</Alert>}

          <div className="form-group mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={handleEmailChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={handlePasswordChange}
              required
            />
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Control as="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Form.Control>
          </Form.Group>

          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary">
              Log In
            </button>
          </div>

          <p className="forgot-password text-right">
            Recuperar <a href="#">password!</a>
          </p>
        </div>
      </form>
    </div>
  );
}