import React, { useState, useEffect } from 'react';
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BiCoin } from 'react-icons/bi';
import { CgCalculator, CgProfile, CgToolbarTop } from 'react-icons/cg';
import { Md10K, MdCarCrash, MdNumbers, MdRecycling } from 'react-icons/md';
import { FiAlignJustify } from "react-icons/fi";
import { 
  CALCULATOR_PAGE_NAME, CALCULATOR_UI, ITEMS_PAGE_NAME, ITEMS_UI, LOGO_WHITE_PATH, PROFILE_UI, STOCKS_PAGE_NAME, 
  STOCKS_UI, 
  SUPPLIER_UI, 
  SUPPLIERS_PAGE_NAME, UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_UI, UNIT_CONVERSION_PAGE_NAME, UNIT_CONVERSION_UI, UNIT_PAGE_NAME, 
  UNIT_UI
} from '@/app/constants/constants';
import { usePathname } from "next/navigation";

const SideNav = () => {
  const [isMobile, setIsMobile] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
  
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  
  const renderNavItem = (href: string | undefined, Icon: React.JSX.IntrinsicAttributes, label: string) => {
    const isActive = pathname === href;
  
    return (
      <Nav.Item>
        <Nav.Link 
          href={href} 
          className={`nav-item-hover ${isActive ? "active-nav" : "bg-primary text-white"}`}     
        >
          <Icon size={15} className="m-2" />
          {!isMobile && label}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <Nav className="flex-column bg-primary text-white" variant="pills" style={{ paddingTop: 30, paddingBottom: 50 }}>
      <Nav.Item className="m-2">
        {isMobile ? (
          <FiAlignJustify size={15} className="m-2" />
        ) : (
          <img 
            src={LOGO_WHITE_PATH}
            alt="Logo" 
            style={{ width: '100%', height: 'auto', maxWidth: '200px' }} 
          />
        )}
      </Nav.Item>

      <hr />

      {renderNavItem(CALCULATOR_UI, CgCalculator, CALCULATOR_PAGE_NAME)}
      {renderNavItem(PROFILE_UI, CgProfile, "Profile")}
      {renderNavItem(STOCKS_UI, BiCoin, STOCKS_PAGE_NAME)}
      {renderNavItem(ITEMS_UI, Md10K, ITEMS_PAGE_NAME)}
      {renderNavItem(UNIT_UI, MdNumbers, UNIT_PAGE_NAME)}
      {renderNavItem(UNIT_CONVERSION_UI, MdRecycling, UNIT_CONVERSION_PAGE_NAME)}
      {renderNavItem(UNIT_CATEGORY_UI, CgToolbarTop, UNIT_CATEGORY_PAGE_NAME)}
      {renderNavItem(SUPPLIER_UI, MdCarCrash, SUPPLIERS_PAGE_NAME)}
    </Nav>
  );
};

export default SideNav;