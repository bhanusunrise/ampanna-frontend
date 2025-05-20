'use client';

import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

interface CustomAlertProps {
  isVisible: boolean;
  variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
  message: string;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, variant, message }) => {
  const [showAlert, setShowAlert] = useState<boolean>(isVisible);

  useEffect(() => {
    setShowAlert(isVisible);

    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleClose = () => {
    setShowAlert(false);
  };

  return (
    <>
      {showAlert && (
        <Alert
          variant={variant}
          onClose={handleClose}
          dismissible
          className="position-fixed top-0 start-50 translate-middle-x"
          style={{ zIndex: 9999, marginTop: '20px' }}
        >
          {message}
        </Alert>
      )}
    </>
  );
};

export default CustomAlert;
