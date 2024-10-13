import BasicTable from "@/app/components/Tables/basic_table"
import { CALCULATOR_TABLE_FIELDS } from "@/app/constants/constants"
import React from "react"

export default function page(){

    return (
        <>
            <h1>Calculator</h1>
            <BasicTable table_fields={CALCULATOR_TABLE_FIELDS} table_records={[['Row 1', 'Row 2', 'Row 3'], ['Row 4', 'Row 5', 'Row 6']]} table_id='table_1'/>
        </>
    )
}