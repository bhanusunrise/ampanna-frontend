'use client'

import TextInput from "@/app/components/Forms/text_input"
import BasicTable from "@/app/components/Tables/basic_table"
import { ADD_ITEM_CATEGORY, ITEM_CATEGORIES_PAGE_NAME, ITEM_CATEGORY_NAME_LABAL, ITEM_CATEGORY_NAME_PLACEHOLDER} from "@/app/constants/constants"
import React, { useState } from "react"
import { Col, Row } from "react-bootstrap"

export default function page(){

    const [itemCategoryName, setItemCategoryName] = useState('');
    const [selectedUnitCategory, setSelectedUnitCategory] = useState('');

    return (
        <>
            <Row>
                <Col md={3}><h3 className={'text-primary'}>{ITEM_CATEGORIES_PAGE_NAME}</h3></Col>
                <Col md={6}><br/></Col>
            </Row>
            <Row>
                <Col md={9}>

                </Col>
                <Col md={3}>
                    <h3 className='text-primary'>{ADD_ITEM_CATEGORY}</h3>
                    <TextInput 
                        label={ITEM_CATEGORY_NAME_LABAL} 
                        onChangeText={(event) => setItemCategoryName(event.target.value)} 
                        form_id="item_category_name" 
                        placeholder_text={ITEM_CATEGORY_NAME_PLACEHOLDER} 
                        value={itemCategoryName} form_message={""} 
                    />
                </Col>
            </Row>
            
        </>
    )
}