'use client'

import React from 'react';
import AddButton from './Buttons/add_button';
import UpdateButton from './Buttons/update_button';
import DeleteButton from './Buttons/delete_button';

const Print = () => {
  console.log("Hello World");
};

const Components: React.FC = () => {
  return (
    <div>
      <h1>Components</h1>
      <h3>Buttons</h3>
      <AddButton label="Submit Button" onClickButton={Print} />
      <UpdateButton label="Update Button" onClickButton={Print} />
      <DeleteButton label="Delete Button" onClickButton={Print} />
      
    </div>
  );
};

export default Components;

