'use client';

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NavigateButtonsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const NavigateButtons: React.FC<NavigateButtonsProps> = ({ currentPage, totalPages, onNext, onPrevious }) => {
  return (
    <div>
      <button
        type='button'
        onClick={onPrevious}
        disabled={currentPage === 0} 
        className='btn btn-primary m-2'
      >
        Previous
      </button>
      <button
        type='button'
        onClick={onNext}
        disabled={currentPage >= totalPages - 1}  // Disable if on the last page
        className='btn btn-primary'
      >
        Next
      </button>
    </div>
  );
};

export default NavigateButtons;

