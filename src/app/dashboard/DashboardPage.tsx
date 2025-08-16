'use client';

import { CgCalculator, CgToolbarTop } from 'react-icons/cg';
import { Md10K, MdCarCrash, MdNumbers, MdRecycling } from 'react-icons/md';
import {
    ACCOUNTS_PAGE_NAME, ACCOUNTS_UI, CALCULATOR_PAGE_NAME, CALCULATOR_UI,
    ITEMS_UI, ITEMS_PAGE_NAME, STOCKS_UI, STOCKS_PAGE_NAME, SUPPLIER_UI, SUPPLIERS_PAGE_NAME,
    UNIT_CATEGORY_UI, UNIT_CATEGORY_PAGE_NAME, UNIT_CONVERSION_UI, UNIT_CONVERSION_PAGE_NAME,
    UNIT_UI, UNIT_PAGE_NAME
} from "../constants/constants";
import { BiCoin } from 'react-icons/bi';

export default function DashboardPage() {
    const items = [
        { icon: <CgCalculator />, link: CALCULATOR_UI, text: CALCULATOR_PAGE_NAME },
        { icon: <BiCoin />, link: STOCKS_UI, text: STOCKS_PAGE_NAME },
        { icon: <MdCarCrash />, link: SUPPLIER_UI, text: SUPPLIERS_PAGE_NAME },
        { icon: <Md10K />, link: ITEMS_UI, text: ITEMS_PAGE_NAME },
        { icon: <CgToolbarTop />, link: UNIT_CATEGORY_UI, text: UNIT_CATEGORY_PAGE_NAME },
        { icon: <MdRecycling />, link: UNIT_CONVERSION_UI, text: UNIT_CONVERSION_PAGE_NAME },
        { icon: <MdNumbers />, link: UNIT_UI, text: UNIT_PAGE_NAME },
        { icon: <CgToolbarTop />, link: ACCOUNTS_UI, text: ACCOUNTS_PAGE_NAME }
    ];

    return (
      <>
        <div className="dashboard-container">
            {items.map((item, index) => (
                <div key={index} className="dashboard-box bg-primary">
                    <a href={item.link} className="dashboard-link">
                        <div className="icon-container">{item.icon}</div>
                        {item.text}
                    </a>
                </div>
            ))}
        </div>
        </>
    );
}