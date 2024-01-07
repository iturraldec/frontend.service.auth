import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function PermissionModal({status, setStatus, save}) {
  const handleClose = () => setStatus(0);

  return (
    <>
      <Modal  
        show={status != 0}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{status == 1 ? "Crear permisos" : "Modificar permiso"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={save}>
            Grabar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PermissionModal;