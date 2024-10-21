import React from 'react';
import { Row, Col } from 'react-bootstrap';

interface SummaryProps {
  fields: string[]; // An array of field names
  values: number[]; // An array of corresponding values
}

const Summary: React.FC<SummaryProps> = ({ fields, values }) => {
  return (
    <>
      <h3 className='text-primary'>Summary</h3>
      <Row>
        <Col md={6}>
          {fields.map((field, index) => (
            <h5 key={index} className='text-secondary'>
              {field}
            </h5>
          ))}
        </Col>
        <Col md={6}>
          {values.map((value, index) => (
            <h5 key={index} className='text-secondary'>
              {value}
            </h5>
          ))}
        </Col>
      </Row>
    </>
  );
};

export default Summary;
