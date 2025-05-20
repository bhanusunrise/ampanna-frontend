'use client'

import TextInput from "../components/Forms/text_input";
import PasswordInput from "../components/Forms/password_input";
import { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ACCOUNT_NAME_LABAL, ACCOUNT_NAME_PLACEHOLDER, ACCOUNT_PASSWORD_LABAL, ACCOUNT_PASSWORD_PLACEHOLDER, CLEAR_BUTTON_LABAL, FORGET_PASSWORD, LOGIN_TITLE, ACCOUNTS_API } from "../constants/constants";
import { useRouter } from 'next/navigation';
import EmailInput from "../components/Forms/email_input";
import DisabledInput from "../components/Forms/disabled_input";
import { ACCOUNT_EMAIL_LABAL, ACCOUNT_EMAIL_PLACEHOLDER } from "../constants/constants";

export default function ForgetPassword() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleClear = () => {
    setUsername('');
    setEmail('');
  };

  const handleEmailSend = () => {
    
  }

  useEffect(() => {
    //setUsername(input_username)
  }) 

  
  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-center bg-light"
      style={{
      backgroundImage: "url(/hardware_shop_image.webp)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      width: "100vw"
      }}
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={6} lg={4}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-primary mb-4">{LOGIN_TITLE}</h3>
              <TextInput 
                label={ACCOUNT_NAME_LABAL} 
                value={username}
                onChangeText={(e) => setUsername(e.target.value)}
                placeholder_text={ACCOUNT_NAME_PLACEHOLDER}
              />
              <EmailInput
                label={ACCOUNT_EMAIL_LABAL}
                value={email}
                onChangeText={(e) => setEmail(e.target.value)}
                placeholder_text={ACCOUNT_EMAIL_PLACEHOLDER}
              />

              <div className="mt-4">
                
                <button className="btn btn-secondary ms-2" onClick={handleClear}>{CLEAR_BUTTON_LABAL}</button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

