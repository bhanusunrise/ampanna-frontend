'use client';

import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface NavigateButtonsProps {
  currentPage: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
}

const NavigateButtons: React.FC<NavigateButtonsProps> = ({ currentPage, totalPages, onNext, onPrevious }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && currentPage < totalPages - 1) {
        onNext(); // Trigger the next button when right arrow is pressed
      } else if (event.key === 'ArrowLeft' && currentPage > 0) {
        onPrevious(); // Trigger the prev button when left arrow is pressed
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, totalPages, onNext, onPrevious]);

  return (
    <div>
      <button
        type='button'
        onClick={onPrevious}
        disabled={currentPage === 0} 
        className='btn btn-primary m-2'
      >
        Prev
      </button>
      <button
        type='button'
        onClick={onNext}
        disabled={currentPage >= totalPages - 1} 
        className='btn btn-primary'
      >
        Next
      </button>
    </div>
  );
};

export default NavigateButtons;
