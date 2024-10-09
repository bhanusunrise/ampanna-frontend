'use client'

import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
const SideNav = () => {
  return (
    <Nav className="flex-column vh-100 bg-dark text-white text-center" variant="pills" style={{paddingTop: 100}}>
      <Nav.Item>
        <Nav.Link href="/dashboard/calculator" className="text-white">Calculator</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/profile" className="text-white">Profile</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/stocks" className="text-white">Stocks</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/units" className="text-white">Units</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/users" className="text-white">Users</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/reports" className="text-white">Reports</Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default SideNav;
