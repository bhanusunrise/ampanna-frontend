`use client`

import TextInput from "@/app/components/Forms/text_input";
import { Col, Row } from "react-bootstrap";
import { blankFunction } from "./functions";

export default function Page(){

    return(
        <>
        <Row>
            <Col md={6}><h3 className={'text-primary'}>Unit Converions</h3></Col>
            <Col md={6}>Add searchbar</Col>
        </Row>
        <Row>

        </Row>
        </>
    )
}