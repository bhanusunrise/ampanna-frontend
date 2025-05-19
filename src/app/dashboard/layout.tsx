'use client'

import SideNav from '@/app/components/Nabars/sidenav';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footers/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <Container fluid>
      <Row>
        <Col 
          md={2} 
          className="p-0 bg-primary"
          style={{ height: '100vh', overflowY: 'auto' }} // Scrollbar only on sidebar
        >
          <SideNav />
        </Col>
        
        <Col 
          md={10} 
          className="pl-4 pr-4 pt-4 bg-white"
          style={{
            marginLeft: '16.66667%',  // Pushes content to align with sidebar width (16.67% is 2 columns in Bootstrap's 12-column grid)
            width: '83.33333%',       // Sets content width to the remaining space (10 columns out of 12)
            position: 'fixed',        // Keeps content steady on scroll
            top: 0,                   // Aligns content at the top
            height: '100vh',          // Full viewport height
            overflowY: 'auto'         // Allows scrolling within the main content area if needed
          }}
        >
          <Container fluid>
            {children}
            <Footer />
          </Container>

        </Col>
      </Row>
    </Container>
    </>
  );
}
