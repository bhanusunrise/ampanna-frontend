'use client'

import SideNav from '@/app/components/Nabars/sidenav';
import { Col, Container, Row } from 'react-bootstrap';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Container fluid>
      <Row>
        {/* 2-column width for SideNav */}
        <Col md={2} className="p-0">
          <SideNav />
        </Col>
        
        {/* 10-column width for the children */}
        <Col md={10} className="p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
}
