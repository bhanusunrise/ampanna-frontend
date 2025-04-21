'use client';
import React, { useEffect, useState } from 'react';
import BasicTable from '@/app/components/Tables/basic_table';
import { UNIT_CATEGORY_PAGE_NAME, UNIT_CATEGORY_TABLE_FIELDS } from '@/app/constants/constants';



const UnitCategoryPage = () => {
  return (
    <>
      <h3 className='text-primary'>{UNIT_CATEGORY_PAGE_NAME}</h3>
      <BasicTable table_fields={UNIT_CATEGORY_TABLE_FIELDS} table_records={[]} table_id='table_1' />
    </>
  );
};

export default UnitCategoryPage;