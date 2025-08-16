import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter className='text-center text-lg-start text-white mt-4 fixed-bottom bg-primary'>
      <div className='text-center p-2'>
        Developed By :{' '}
        <a className='text-white fw-bold' href='https://www.pasindubhanuka.com/'>
          Pasindu Bhanuka - IM/2020/108
        </a>
      </div>
    </MDBFooter>
  );
}
