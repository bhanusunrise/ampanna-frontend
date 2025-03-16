import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';

interface SummaryProps {
  fields: string[]; // An array of field names
  values: number[]; // An array of corresponding values
}

const Summary: React.FC<SummaryProps> = ({ fields, values }) => {
  // Calculate the total of the values
  const total = values.reduce((acc, value) => acc + value, 0);

  return (
    <>
      <h3 className='text-primary'>Summary</h3>
      {fields.map((field, index) => {
        // Get the value for the current field
        const value = values[index];
        // Skip rendering if the value is 0
        if (value === 0) return null;

        // Calculate the percentage for each value
        const percentage = total > 0 ? (value / total) * 100 : 0; // Avoid division by zero

        // Determine the variant and label based on percentage
        let variant: string;
        let label: string;

        if (percentage === 100) {
          variant = 'success';
          label = '100%';
        } else if (percentage >= 70) {
          variant = 'primary';
          label = `${Math.round(percentage)}%`;
        } else if (percentage >= 40) {
          variant = 'danger';
          label = `${Math.round(percentage)}%`;
        } else if (percentage >= 0) {
          variant = 'warning';
          label = `${Math.round(percentage)}%`;
        } else {
          variant = 'secondary';
          label = 'Error';
        }

        return (
            <>
          <Row key={index} className="mb-3">
            <Col md={6}>
              <h5 className='text-black'>{field}</h5>
            </Col>
            <Col md={6}>
              <ProgressBar now={percentage} variant={variant} label={label} />
            </Col>
          </Row>
          </>
        );
      })}
    </>
  );
};

export default Summary;
