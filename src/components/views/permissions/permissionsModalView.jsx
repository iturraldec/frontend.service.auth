import { Button, Modal } from 'react-bootstrap';
import FormBootstrap from 'react-bootstrap/Form';

export default function PermissionsModalView(props) {
  return (
    <Modal  
      show={props.show}
      backdrop="static"
      keyboard={false}
      onHide={props.handleCloseModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.id === '0' ? "Crear permiso" : "Modificar permiso"}</Modal.Title>
      </Modal.Header>
      
      <form onSubmit={props.handleSubmit}>
      <Modal.Body>
        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Nombre</FormBootstrap.Label>
          <FormBootstrap.Control 
            type="text"
            id="name"
            name="name" 
            value={props.name}
            onChange={props.handleChangeName}
            placeholder="Ingrese permiso"
          />
        </FormBootstrap.Group>

        <FormBootstrap.Group className="mb-3">
          <FormBootstrap.Label>Slug</FormBootstrap.Label>
          <FormBootstrap.Control
            type='text'
            id='slug'
            name='slug'
            value={props.slug}
            placeholder='Slug'
            readOnly 
          />
        </FormBootstrap.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleCloseModal}>
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