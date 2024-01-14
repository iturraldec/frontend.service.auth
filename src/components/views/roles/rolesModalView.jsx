import { Button, Modal } from 'react-bootstrap';
import FormBootstrap from 'react-bootstrap/Form';

export default function RolesModalView(props) {
  return (
    <Modal  
      show={props.show}
      backdrop="static"
      keyboard={false}
      onHide={props.handleShowModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.role.id === '' ? "Crear rol" : "Modificar rol"}</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Nombre</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="text"
            id="name"
            name="name" 
            value={props.role.name}
            onChange={props.handleChangeName}
            placeholder="Ingrese rol"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Slug</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="text"
            id="slug"
            name="slug" 
            value={props.role.slug}
            placeholder="Slug"
            readOnly
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Permisos</FormBootstrap.Label>
          { props.permissionsDataList && 
            props.permissionsDataList.map(item => 
              <FormBootstrap.Check 
                type="switch"
                key={item.id}
                id={item.id}
                label={item.name}
                onChange={props.handleChangePermissions}
                checked={props.role.permissions.includes(item.id)}
              />)
          }
        </FormBootstrap.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleShowModal}>
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