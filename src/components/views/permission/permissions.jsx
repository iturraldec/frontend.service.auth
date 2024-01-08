import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import FormBootstrap from 'react-bootstrap/Form';
import MyToast from 'components/myToast';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useFetch from 'hooks/useFetch';
import PermissionsListView from './permissionsListView';

function getUrl(page) {
  return `http://localhost:8000/api/permissions?page=${page}`;
};

export default function Permissions() {
  const [id, setId]                   = useState('0');
  const [name, setName]               = useState('');
  const [slug, setSlug]               = useState('');
  const [totalPage, setTotalPage]     = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal]     = useState(false);
  const [url, setUrl]                 = useState(getUrl(1));
  const fetchState                    = useFetch(url);
  const [message, setMessage]         = useState('');

  //
  useEffect(() => {
    if(fetchState.state === 'success') {
      setCurrentPage(fetchState.data.data.current_page);
      setTotalPage(fetchState.data.data.last_page);
    }
  }, [fetchState]);

  //
  function handleChangeName(e) {
    let texto = e.target.value.toUpperCase();

    setName(texto);
    setSlug(texto.replace(/ /g, "-").toLowerCase());
  }

  //
  function handleCreate () {
    setId('0');
    setName('');
    setSlug('');
    setShowModal(true);
  };

  //
  function handleUpdate(permission) {
    setId(permission.id);
    setName(permission.name);
    setSlug(permission.slug);
    setShowModal(true);
  };

  //
  async function handleSubmit(event) {
    event.preventDefault();

    let permiso = {
      'name': name,
      'slug': slug
    };

    if (id === '0') {
      await fetch('http://localhost:8000/api/permissions',{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(permiso)
      });

      setMessage("Permiso agregado...");
    }
    else {
       await fetch(`http://localhost:8000/api/permissions/${id}`,{
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(permiso)
      });

      setMessage("Permiso actualizado...");
    }
    setShowModal(false);
    handleChangePage(1);
  }

  //
  function handleDelete(_id) {
    withReactContent(Swal).fire({
      title: "Seguro de ELIMINAR el permiso y sus relaciones?",
      text: "No podras revertir esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
      cancelButtonText: "Cancelar"
    })
    .then((result) => {
      if (result.isConfirmed) {
        deletePermission(_id);
      } 
    });
  }

  //
  async function deletePermission(_id) {
    await fetch(`http://localhost:8000/api/permissions/${_id}`,{
                method: 'delete',
                headers: {
                  'Accept': 'application/json'
         }
    });
    handleChangePage(1);
    setMessage("Permiso eliminado...");
  }

  //
  function handleChangePage(_page) {
    setUrl(getUrl(_page));
  };

  //
  function handleCloseModal () {
    setShowModal(false);
  }

  //
  function handleMessageClose() {
    setMessage('');
  }

  return (
    <>
      <MyToast message={message} handleMessageClose={handleMessageClose} />

      {fetchState.state === 'success' && <PermissionsListView 
        handleCreate={handleCreate}
        state={fetchState.state}
        dataList={fetchState.data.data.data}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
        totalPage={totalPage}
        currentPage={currentPage}
        handleChangePage={handleChangePage}
      />}
      
      <Modal  
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleCloseModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{id === '0' ? "Crear permiso" : "Modificar permiso"}</Modal.Title>
        </Modal.Header>
        
        <form onSubmit={handleSubmit}>
        <Modal.Body>
          <FormBootstrap.Group className="mb-3">
            <FormBootstrap.Label>Nombre</FormBootstrap.Label>
            <FormBootstrap.Control 
              type="text"
              id="name"
              name="name" 
              value={name}
              onChange={handleChangeName}
              placeholder="Ingrese permiso"
            />
          </FormBootstrap.Group>

          <FormBootstrap.Group className="mb-3">
            <FormBootstrap.Label>Slug</FormBootstrap.Label>
            <FormBootstrap.Control
              type='text'
              id='slug'
              name='slug'
              value={slug}
              placeholder='Slug'
              readOnly 
            />
          </FormBootstrap.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button type="submit" variant="primary">
            Grabar
          </Button>
        </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}