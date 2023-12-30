import { Link, Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Layout() {
  return (
    <>
      <Navbar bg="dark" expand="lg" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link} to="service">Service.auth</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="home">Home</Nav.Link>
              <Nav.Link as={Link} to="dashboard">Dashboard</Nav.Link>
              <Nav.Link as={Link} to="roles">Roles</Nav.Link>
              <Nav.Link as={Link} to="permissions">Permisos</Nav.Link>
              <Nav.Link as={Link} to="users">Usuarios</Nav.Link>
              <Nav.Link as={Link} to="logout">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div>
        <Outlet />
      </div>
    </>
  );
}