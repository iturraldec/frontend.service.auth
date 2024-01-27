import PropTypes from 'prop-types';
import ToastContainer from 'react-bootstrap/ToastContainer';
import Toast from 'react-bootstrap/Toast';

export default function MyToast(props) {
  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: 1 }}
    >
      <Toast 
        onClose={props.handleCloseMessage} 
        delay={props.delay > 0 ? `${props.delay} autohide` : null}
      >
        <Toast.Header>
          <strong className="me-auto">Atención!</strong>
        </Toast.Header>
        <Toast.Body>{props.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
};

//
MyToast.propTypes = {
  message:            PropTypes.string.isRequired,
  handleCloseMessage: PropTypes.func.isRequired
};

//
MyToast.defaultProps = {
  delay: 0
};