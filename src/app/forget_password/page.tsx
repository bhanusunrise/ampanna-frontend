'use client';

import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  ACCOUNT_EMAIL_LABAL,
  ACCOUNT_EMAIL_PLACEHOLDER,
  CLEAR_BUTTON_LABAL,
  LOGIN_TITLE,
  ACCOUNTS_API
} from "../constants/constants";
import { useRouter } from 'next/navigation';
import EmailInput from "../components/Forms/email_input";
import NumberInput from "../components/Forms/number_input";
import PasswordInput from "../components/Forms/password_input";

export default function ForgetPassword() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [emailDisabled, setEmailDisabled] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);
  const [otpAttempts, setOtpAttempts] = useState(0);

  const handleClear = () => {
    setEmail('');
    setOtp('');
    setPassword('');
    setRetypePassword('');
    setEmailDisabled(false);
    setIsSending(false);
    setOtpSent(false);
    setOtpValidated(false);
    setOtpAttempts(0);
  };

  const handleEmailSend = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    setIsSending(true);
    try {
      const otpRes = await fetch(`${ACCOUNTS_API}create_otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const otpData = await otpRes.json();

      if (otpData.success) {
        alert("OTP generated.");
        setEmailDisabled(true);
        setOtpSent(true);

        const sendRes = await fetch(`${ACCOUNTS_API}send_email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: 'Your OTP Code',
            text: `Your One-Time Password (OTP) is: ${otpData.otp}`
          })
        });

        const sendData = await sendRes.json();
        if (sendData.success) {
          alert("OTP sent to your email.");
        } else {
          alert("OTP generated but failed to send email.");
        }
      } else {
        alert(otpData.message || "Failed to generate OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleOtpValidation = async () => {
    if (!otp) return alert("Please enter the OTP.");

    try {
      const res = await fetch(`${ACCOUNTS_API}validate_otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        setOtpValidated(true);
        alert("OTP validated successfully.");
      } else {
        const newAttempts = otpAttempts + 1;
        setOtpAttempts(newAttempts);
        alert("Invalid OTP.");

        if (newAttempts >= 5) {
          alert("You have exceeded the maximum attempts.");
          router.push('/');
        }
      }
    } catch (error) {
      console.error("Error validating OTP:", error);
      alert("Something went wrong.");
    }
  };

  const handlePasswordChange = async () => {
    if (!password || !retypePassword) {
      alert("Please enter both password fields.");
      return;
    }

    if (password !== retypePassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch(`${ACCOUNTS_API}change_password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, retype: retypePassword })
      });

      const data = await res.json();

      if (data.success) {
        alert("Password changed successfully.");
        router.push('/');
      } else {
        alert(data.message || "Failed to change password.");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Server error.");
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

              <EmailInput
                label={ACCOUNT_EMAIL_LABAL}
                value={email}
                onChangeText={(e) => setEmail(e.target.value)}
                placeholder_text={ACCOUNT_EMAIL_PLACEHOLDER}
                disabled={emailDisabled}
              />

              {otpSent && !otpValidated && (
                <>
                  <NumberInput
                    label="Enter OTP"
                    value={otp}
                    onChangeText={(e) => setOtp(e.target.value)}
                    placeholder_text="Enter the 6-digit OTP"
                  />
                  <div className="mt-2 text-end">
                    <button
                      className="btn btn-success"
                      onClick={handleOtpValidation}
                    >
                      Validate OTP
                    </button>
                  </div>
                </>
              )}

              {otpValidated && (
                <>
                  <PasswordInput
                    label="New Password"
                    value={password}
                    onChangeText={(e) => setPassword(e.target.value)}
                    placeholder_text="Enter new password"
                  />
                  <PasswordInput
                    label="Retype Password"
                    value={retypePassword}
                    onChangeText={(e) => setRetypePassword(e.target.value)}
                    placeholder_text="Retype new password"
                  />
                  <button
                    className="btn btn-success mt-3 w-100"
                    onClick={handlePasswordChange}
                  >
                    Change Password
                  </button>
                </>
              )}

              <div className="mt-4 d-flex justify-content-end">
                <button
                  className="btn btn-primary"
                  onClick={handleEmailSend}
                  disabled={isSending || emailDisabled}
                >
                  {isSending ? 'Sending...' : 'Send OTP Code'}
                </button>
                <button className="btn btn-secondary ms-2" onClick={handleClear}>
                  {CLEAR_BUTTON_LABAL}
                </button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}



