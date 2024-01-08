import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

export default function MyToast({message, handleMessageClose}) {
  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast show={message.length > 0} onClose={handleMessageClose} delay={3000} autohide>
        <Toast.Header>
          <strong className="me-auto">Atención!</strong>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}