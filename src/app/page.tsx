'use client'

import TextInput from "./components/Forms/text_input";
import PasswordInput from "./components/Forms/password_input";
import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { ACCOUNT_NAME_LABAL, ACCOUNT_NAME_PLACEHOLDER, ACCOUNT_PASSWORD_LABAL, ACCOUNT_PASSWORD_PLACEHOLDER, CLEAR_BUTTON_LABAL, FORGET_PASSWORD, LOGIN_TITLE, ACCOUNTS_API } from "./constants/constants";
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleClear = () => {
    setUsername('');
    setPassword('');
  };

  const handleLogin = async () => {
    try {
        const response = await fetch(`${ACCOUNTS_API}login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert('Unauthorized');
            return;
        }

        // Store token in localStorage
        localStorage.setItem('authToken', data.data.token);

        console.log('Login successful:', data);
        router.push('/dashboard');
    } catch (error) {
        console.error('Login error:', error);
        alert('System Error');
    }
};
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
              <PasswordInput 
                label={ACCOUNT_PASSWORD_LABAL} 
                value={password}
                onChangeText={(e) => setPassword(e.target.value)}
                required
                placeholder_text={ACCOUNT_PASSWORD_PLACEHOLDER}
              />
              <div className="mt-4">
                <button className="btn btn-primary" onClick={handleLogin}>{LOGIN_TITLE}</button>
                <button className="btn btn-secondary ms-2" onClick={handleClear}>{CLEAR_BUTTON_LABAL}</button>
              </div>
              <div className="mt-4">
                <p><a href="/forget_password">{FORGET_PASSWORD}</a></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}