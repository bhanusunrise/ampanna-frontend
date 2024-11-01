'use client'

import React from 'react';
import TextInput from "@/app/components/Forms/text_input";
import { login_handle } from "./functions";
import PasswordInput from '@/app/components/Forms/password_input';
import ClearButton from '@/app/components/Buttons/clear_button';
import AddButton from '@/app/components/Buttons/add_button';
import { Col, Row } from 'react-bootstrap';

export default function Login() {
    return(
        <>
            <div style={{paddingLeft: '40vh', paddingRight: '40vh', justifyContent: 'center', display: 'flex', flexDirection: 'column', height: '100vh'}}>
            <h1>Login</h1>
            
            <TextInput 
                label="Username :" 
                onChangeText={login_handle} 
                form_id="login_username" 
                form_message="" 
                placeholder_text='charuka2000'
            />
            <PasswordInput label='Password' onChangeText={login_handle} form_id='login_password' form_message='' placeholder_text='********'/>
            <br/>
            <Row>
                <Col><ClearButton label='Reset' onClickButton={login_handle} btn_id='Reset'/></Col>
                <Col><AddButton label='Login' onClickButton={login_handle} btn_id='Login'/></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>          
            </div>
        </>
    )
}
