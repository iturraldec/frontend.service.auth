import { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import FormBootstrap from 'react-bootstrap/Form';
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";
import MyPagination from 'components/MyPagination';
import getPermissions from 'request/getPermissions';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export default function Permissions() {
  const [permissions, setPermissions] = useState([]);
  const [show, setShow]       = useState(false);
  const [id, setId]           = useState('0');
  const [name, setName]       = useState('');
  const [slug, setSlug]       = useState('');
  const [page, setPage]       = useState(1);
  const [totalPage, setTotalPage]     = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  
  useEffect(() => {
    async function getData() {
      let data = await getPermissions(page);
      
    setCurrentPage(data.data.current_page);
    setTotalPage(data.data.last_page);
    setPermissions(data.data.data);
  };

    getData();
    
  }, [page]);

  function handleChangePage(_page) {
    setPage(_page);
  };

  function handleCreate() {
    setId('0');
    setName('');
    setSlug('');
    setShow(true);
  }

  function handleUpdate(permission) {
    setId(permission.id);
    setName(permission.name);
    setSlug(permission.slug);
    setShow(true);
  }

  function handleClose () {
    setShow(false);
  }

  function handleChangeName(e) {
    let texto = e.target.value.toUpperCase();

    setName(texto);
    setSlug(texto.replace(/ /g, "-").toLowerCase());
  }

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

  async function deletePermission(_id) {
    await fetch(`http://localhost:8000/api/permissions/${_id}`,{
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    });
    setPage(1);
  }

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
    }
    setShow(false);
    setPage(page);
  }

  return (
    <>
      <Container>
        <Row className="mt-3 justify-content-center">
          <Col xs={6}>
            <Card className="text-center">
              <Card.Header><h4>Permisos</h4></Card.Header>
              <Card.Body>
                <div className="d-grid gap-2 mb-2">
                  <Button variant="primary" size="sm" onClick={handleCreate}>
                    Agregar
                  </Button>
                </div>

                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Slug</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {permissions && permissions.length > 0 && permissions.map((item, id) => (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.slug}</td>  
                          <td>
                            <Button variant="secondary" size="sm" onClick={() => handleUpdate(item)}><BsPencilSquare /></Button>
                          </td>
                          <td>
                            <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}><BsFillTrash3Fill /></Button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>

                {totalPage > 1 && <p className="text-center">
                  <MyPagination total={totalPage} current={currentPage} onChangePage={handleChangePage} />
                </p>
                }

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <Modal  
        show={show}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
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
          <Button variant="secondary" onClick={handleClose}>
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