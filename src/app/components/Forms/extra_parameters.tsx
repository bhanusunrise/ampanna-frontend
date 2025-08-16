'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import TextInput from './text_input'; // Assuming TextInput is in the same directory

interface OtherParameter {
  parameter_name: string;
  value: string;
}

interface ExtraParametersProps {
  other_parameters: OtherParameter[];
  onParameterChange: (index: number, field: 'parameter_name' | 'value', newValue: string) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
}

const ExtraParameters: React.FC<ExtraParametersProps> = ({ other_parameters, onParameterChange, onAddRow, onRemoveRow }) => {
  return (
    <div>
      <Table>
        <tbody>
          {other_parameters.map((param, index) => (
            <tr key={index} className='pt-4'>
              <td>
                <TextInput
                  form_id={`param-name-${index}`}
                  placeholder_text="RPM"
                  value={param.parameter_name}
                  onChangeText={(e) => onParameterChange(index, 'parameter_name', e.target.value)}
                />
              </td>
              <td>
                <TextInput
                  form_id={`param-value-${index}`}
                  placeholder_text="5000"
                  value={param.value}
                  onChangeText={(e) => onParameterChange(index, 'value', e.target.value)}
                />
              </td>
              <td>
                <Button variant="danger" onClick={() => onRemoveRow(index)} className="btn-sm">
                  🗑️
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddRow} variant="primary" className="mb-2">
        +
      </Button>
    </div>
  );
};

export default ExtraParameters;