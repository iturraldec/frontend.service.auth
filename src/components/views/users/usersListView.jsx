import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";
import MyPagination from 'components/myPagination';

export default function UsersListView(props) {
  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col xs={6}>
          <Card className="text-center">
            <Card.Header><h4>Listado de Usuarios</h4></Card.Header>
            <Card.Body>
              <div className="d-grid gap-2 mb-2">
                <Button variant="primary" size="sm" onClick={props.handleCreate}>
                  Agregar
                </Button>
              </div>

              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Roles</th>
                    <th>Estado</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.users.data?.map((item, id) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.email}</td>  
                        <td>roles</td>  
                        <td>estado</td>  
                        <td>
                          <Button variant="secondary" size="sm" onClick={() => props.handleUpdate(item)}><BsPencilSquare /></Button>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={() => props.handleDelete(item.id)}><BsFillTrash3Fill /></Button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </Table>

              {/* <MyPagination pageData={props.permissions} onChangePage={props.handleChangePage} /> */}

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};