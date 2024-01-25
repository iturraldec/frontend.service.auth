import { Container, Row, Col, Table } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLoaderData } from 'react-router';

export default function Dashboard() {
  const loader = useLoaderData();

  return (
    <Container>
      <Row className="mt-3 justify-content-center">
        <Col xs={6}>
          <Card className="text-center">
            <Card.Header><h4>Dashboard</h4></Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Cant.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loader.data.data.map((item, id) => {
                      return (
                        <tr key={item.concepto}>
                          <td>{item.concepto}</td>
                          <td>{item.cantidad}</td>
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
};