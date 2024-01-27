import { Button, Modal } from 'react-bootstrap';
import FormBootstrap from 'react-bootstrap/Form';

export default function UserModalView(props) {
  return (
    <Modal
      show
      backdrop="static"
      keyboard={false}
      onHide={props.handleToogleModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.user.id === '' ? "Crear usuario" : "Modificar usuario"}</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Nombre</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="text"
            id="name"
            name="name" 
            value={props.user.name}
            onChange={props.handleChangeName}
            placeholder="Ingrese nombre del usuario"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>E-mail</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="email"
            id="email"
            name="email" 
            value={props.user.email}
            onChange={props.handleChangeEmail}
            placeholder="Ingrese correo electronico"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Password</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="password"
            id="password"
            name="password" 
            value={props.user.password}
            onChange={props.handleChangePassword}
            placeholder="Ingrese password"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Repita password</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="password"
            id="password2"
            name="password2" 
            value={props.user.password2}
            onChange={props.handleChangePassword2}
            placeholder="Repita password"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Roles</FormBootstrap.Label>
          { props.roles.map(item => 
              <FormBootstrap.Check 
                type="switch"
                key={item.id}
                id={item.id}
                label={item.name}
                onChange={props.handleChangeRoles}
                checked={props.user.roles.includes(item.id)}
              />)
          }
        </FormBootstrap.Group>

      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleToogleModal}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary">
          Grabar
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  )
}