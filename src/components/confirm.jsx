import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Confirm(_title, _text = 'No podrá revertir esta acción!', _confirmButtonText = 'Sí, Eliminar!') {
  return withReactContent(Swal).fire({
    title: _title,
    text: _text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: _confirmButtonText,
    cancelButtonText: "Cancelar"
  });
};