import React from 'react';
import { Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { BiCoin, BiDiamond } from 'react-icons/bi';
import { CgCalculator, CgProfile, CgToolbarTop } from 'react-icons/cg';
import { Md10K, MdBackpack, MdNumbers, MdRecycling } from 'react-icons/md';
import { GrGroup } from 'react-icons/gr';
import { IoMdPaper } from 'react-icons/io';
import { ITEM_CATEGORIES_PAGE_NAME, ITEMS_PAGE_NAME, LOGO_WHITE_PATH, UNIT_CATEGORY_PAGE_NAME, UNIT_CONVERSION_PAGE_NAME, UNIT_PAGE_NAME } from '@/app/constants/constants';

const SideNav = () => {
  return (
    <Nav className="flex-column bg-primary text-white" variant="pills" style={{ paddingTop: 30, paddingBottom: 50 }}>
      <Nav.Item className="m-2">
        <img
          src={LOGO_WHITE_PATH}
          alt="Logo"
          style={{ width: '100%', height: 'auto', maxWidth: '200px' }} // Fit image to sidebar width
        />
      </Nav.Item>

      <hr/>

      <Nav.Item>
        <Nav.Link href="/dashboard/calculator" className="text-white">
          <CgCalculator size={20} className="m-2" />Calculator
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/profile" className="text-white">
          <CgProfile size={20} className="m-2" />Profile
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/stocks" className="text-white">
          <BiCoin size={20} className="m-2" />Stocks
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/items" className="text-white">
          <CgToolbarTop size={20} className="m-2" />{ITEMS_PAGE_NAME}
        </Nav.Link>
      </Nav.Item>
       <Nav.Item>
        <Nav.Link href="/dashboard/item_categories" className="text-white">
          <MdBackpack size={20} className="m-2" />{ITEM_CATEGORIES_PAGE_NAME}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/unit_categories" className="text-white">
          <Md10K size={20} className="m-2" />{UNIT_CATEGORY_PAGE_NAME}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/units" className="text-white">
          <MdNumbers size={20} className="m-2" />{UNIT_PAGE_NAME}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/unit_conversions" className="text-white">
          <MdRecycling size={20} className="m-2" />{UNIT_CONVERSION_PAGE_NAME}
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/users" className="text-white">
          <GrGroup size={20} className="m-2" />Users
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/reports" className="text-white">
          <IoMdPaper size={20} className="m-2" />Reports
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/dashboard/customer" className="text-white">
          <BiDiamond size={20} className="m-2" />Customers
        </Nav.Link>
      </Nav.Item>
      
    </Nav>
  );
};

export default SideNav;
