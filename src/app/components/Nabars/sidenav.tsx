'use client'

import React from 'react';
import Link from 'next/link';
import { Nav } from 'react-bootstrap';

const SideNav = () => {
  return (
    <>
<Nav className="flex-column" variant='pills'>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/login">Login</Nav.Link>
      </Nav.Item>
    </Nav>
    </>
  );
};

export default SideNav;