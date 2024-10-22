'use client'

import SideNav from '@/app/components/Nabars/sidenav';
import { Col, Container, Row } from 'react-bootstrap';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container fluid>
      <Row>       
        <Col md={2} className="p-0 bg-primary">
          <SideNav />
        </Col>
        
        <Col md={10} className="p-4">
          <Container fluid>
          {children}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
