'use client'

import React from 'react';
import AddButton from './Buttons/add_button';
import UpdateButton from './Buttons/update_button';
import DeleteButton from './Buttons/delete_button';
import ClearButton from './Buttons/clear_button';
import BasicTable from './Tables/basic_table';

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
      <ClearButton label="Clear Button" onClickButton={Print} />
      <h3>Tables</h3>
      <BasicTable table_fields={['Field 1', 'Field 2', 'Field 3']} table_records={[['Row 1', 'Row 2', 'Row 3'], ['Row 4', 'Row 5', 'Row 6']]} />
    </div>
  );
};

export default Components;

