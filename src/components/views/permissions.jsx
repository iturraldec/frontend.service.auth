import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLoaderData } from 'react-router';
import { BsPencilSquare } from "react-icons/bs";
import { BsFillTrash3Fill } from "react-icons/bs";

export default function Permissions() {
  const loader = useLoaderData();

  function handleDelete() {
    console.log("sssss");
  }

  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col xs={6}>
          <Card className="text-center">
            <Card.Header><h4>Permisos</h4></Card.Header>
            <Card.Body>
              <div className="d-grid gap-2 mb-2">
                <Button variant="primary" size="sm">
                  Agregar
                </Button>
              </div>

              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Slug</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {loader.data.map((item, id) => {
                    return (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                        <td>
                          <Button variant="secondary" size="sm"><BsPencilSquare /></Button>
                        </td>
                        <td>
                          <Button variant="danger" size="sm" onClick={handleDelete}><BsFillTrash3Fill /></Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}