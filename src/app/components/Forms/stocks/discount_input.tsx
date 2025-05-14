'use client';

import React from 'react';
import { Table, Button } from 'react-bootstrap';
import NumberInput from '../number_input'; // Assuming NumberInput is in the same directory
import { STOCK_DISCOUNT_END_DATE_LABAL, STOCK_DISCOUNT_PERCENTAGE_LABAL, STOCK_DISCOUNT_START_DATE_LABAL } from '@/app/constants/constants';

interface Discount {
  id: number;
  start_date: string;
  end_date: string;
  percentage: number;
}

interface DiscountProps {
  discounts: Discount[];
  onDiscountChange: (index: number, field: 'start_date' | 'end_date' | 'percentage', newValue: string | number) => void;
  onAddRow: () => void;
  onRemoveRow: (index: number) => void;
}

const ExtraDiscounts: React.FC<DiscountProps> = ({ discounts, onDiscountChange, onAddRow, onRemoveRow }) => {
  return (
    <div>
      <Table>
        <tbody>
          {discounts.map((discount, index) => (
            <>
              {/* First Row: Start Date & End Date */}
              <tr key={`row-${discount.id}`} className="pt-4">

                <td>
                  <label className='text-primary text-xs'>{STOCK_DISCOUNT_START_DATE_LABAL}</label>
                  <input
                    type="date"
                    id={`start-date-${index}`}
                    value={discount.start_date}
                    onChange={(e) => onDiscountChange(index, 'start_date', e.target.value)}
                    className="form-control form-control-sm"
                    style={{ width: '100%', marginLeft: '0 !important', paddingLeft: '0 !important' }}
                  />
                </td>
                <td>
                <label className='text-primary text-xs'>{STOCK_DISCOUNT_END_DATE_LABAL}</label>
                  <input
                    type="date"
                    id={`end-date-${index}`}
                    value={discount.end_date}
                    onChange={(e) => onDiscountChange(index, 'end_date', e.target.value)}
                    className="form-control form-control-sm"
                    style={{ width: '100%' }} // Full width
                  />
                </td>
              </tr>

              {/* Second Row: Percentage */}
              <tr key={`percentage-${discount.id}`}>
                <td> {/* Merges into one row */}
                <label className='text-primary text-xs'>{STOCK_DISCOUNT_PERCENTAGE_LABAL}</label>
                  <NumberInput
                    form_id={`percentage-${index}`}
                    placeholder_text="Enter Discount %"
                    min_value={0}
                    max_value={100}
                    value={discount.percentage}
                    onChangeText={(e) => onDiscountChange(index, 'percentage', Number(e.target.value))}
                  />
                </td>
                <td> {/* Delete button spans both rows */}
                <br/>
                  <Button variant="danger" onClick={() => onRemoveRow(index)} className="btn-sm">
                    🗑️
                  </Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
      <Button onClick={onAddRow} variant="primary" className="mb-2">
        +
      </Button>
    </div>
  );
};

export default ExtraDiscounts;