import SideNav from '@/app/components/Nabars/sidenav';
import { Col, Container, Row } from 'react-bootstrap';
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Container>
        <Row>
        <Col md={2}>
            <SideNav />
        </Col>
        <Col md={9}>
            {children}
        </Col>
        </Row>
    </Container>
    </>

  );
}