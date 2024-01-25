import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PropTypes from 'prop-types';

export default function Confirm(props) {
  return withReactContent(Swal).fire({
    title: props.title,
    text: props.text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: props.confirmButtonText,
    cancelButtonText: "Cancelar"
  });
};

//
Confirm.prototype = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

//
Confirm.defaultProps = {
  confirmButtonText: 'Si, Eliminar!'
};