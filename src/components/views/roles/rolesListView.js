import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap';
import { BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";
import MyPagination from 'components/myPagination';

export default function RolesListView(props) {
  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col xs={6}>
          <Card className="text-center">
            <Card.Header><h4>Lista de Roles</h4></Card.Header>
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
                    <th>Slug</th>
                    <th>Permisos</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {props.dataList.map((item, id) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>  
                        <td>permisos</td>  
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

              {props.totalPage > 1 && <div className="text-center">
                  <MyPagination total={props.totalPage} current={props.currentPage} onChangePage={props.handleChangePage} />
                </div>
              }

            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}