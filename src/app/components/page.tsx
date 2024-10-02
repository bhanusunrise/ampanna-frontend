'use client'

import React from 'react';
import AddButton from './Buttons/add_button';
import UpdateButton from './Buttons/update_button';
import DeleteButton from './Buttons/delete_button';
import ClearButton from './Buttons/clear_button';
import BasicTable from './Tables/basic_table';
import TextInput from './Forms/text_input';
import PasswordInput from './Forms/password_input';
import EmailInput from './Forms/email_input';
import NumberInput from './Forms/number_input';

const Print = () => {
  console.log("Hello World");
};

const Components: React.FC = () => {
  return (
    <div>
      <h1>Components</h1>
      <h3>Buttons</h3>
      <AddButton label="Submit Button" onClickButton={Print} btn_id="add"/>
      <UpdateButton label="Update Button" onClickButton={Print} btn_id="update"/>
      <DeleteButton label="Delete Button" onClickButton={Print} btn_id="delete"/>
      <ClearButton label="Clear Button" onClickButton={Print} btn_id="clear"/>
      <h3>Tables</h3>
      <BasicTable table_fields={['Field 1', 'Field 2', 'Field 3']} table_records={[['Row 1', 'Row 2', 'Row 3'], ['Row 4', 'Row 5', 'Row 6']]} table_id='table_1'/>
      <h3>Forms</h3>
      <TextInput label="Text Input" onChangeText={Print} form_id="text_input" form_message="Text Input Message" placeholder_text='Type something'/><br/>
      <PasswordInput label="Password Input" onChangeText={Print} form_id="password_input" form_message="Password Input Message" placeholder_text='********'/>
      <EmailInput label="Email Input" onChangeText={Print} form_id="email_input" form_message="Email Input Message" placeholder_text='Type something'/>
      <NumberInput label="Number Input" onChangeText={Print} form_id="number_input" form_message="Number Input Message" placeholder_text='Type something' min_value={0} max_value={100}/>
    </div>
  );
};

export default Components;

