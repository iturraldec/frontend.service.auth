import { Container } from "react-bootstrap";
import Footer from "./Footer";
import MyNavbar from "./layout";

export default function Template({children}) {
  return (
    <>
      <MyNavbar />

      <Container>
        {children}
      </Container>

      <Footer />
    </>
  );
}