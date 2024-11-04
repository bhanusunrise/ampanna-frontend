'use client'

import BasicTable from "@/app/components/Tables/basic_table"
import { ITEMS_PAGE_NAME, ITEMS_TABLE_FIELDS } from "@/app/constants/constants"
import React, { useState } from "react"
import { Col, Row } from "react-bootstrap"

export default function page(){

    const [itemName, setItemName] = useState('');
    const [itemBarCode, setItemBarCode] = useState('');

    return (
        <>
            <Row>
                <Col md={3}><h3 className={'text-primary'}>{ITEMS_PAGE_NAME}</h3></Col>
                <Col md={6}><br/></Col>
            </Row>
            <Row>
                <Col md={9}>
                
                </Col>
                <Col md={3}>
                </Col>
            </Row>
            
        </>
    )
}