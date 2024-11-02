 'use client';

import TextInput from "@/app/components/Forms/text_input";
import SelectBox from "@/app/components/Forms/select_box";
import { Col, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetchAllUnits } from './functions'; // Assuming it's in the same directory
import NumberInput from "@/app/components/Forms/number_input";
import { ADD_UNIT_CONVERSION, UNIT_CONVERSION_PAGE_NAME } from "@/app/constants/constants";

export default function Page() {
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [value, setValue] = useState('');
  const [unitIds, setUnitIds] = useState<string[]>([]); // Store unit IDs
  const [unitNames, setUnitNames] = useState<string[]>([]); // Store unit names
  const [loading, setLoading] = useState(true);

  // Fetch the unit data on component mount
  useEffect(() => {
    const loadUnits = async () => {
      setLoading(true);
      const units = await fetchAllUnits();
      
      if (units.length > 0) {
        // Separate the unit IDs and names from the response
        const ids = units.map((unit: { unit_id: string }) => unit.unit_id);
        const names = units.map((unit: { unit_name: string }) => unit.unit_name);

        setUnitIds(ids);
        setUnitNames(names);
      }
      setLoading(false);
    };

    loadUnits();
  }, []);

  return (
    <>
      <Row>
        <Col md={6}><h3 className={'text-primary'}>{UNIT_CONVERSION_PAGE_NAME}</h3></Col>
        <Col md={6}>Add searchbar</Col>
        <br/>
      </Row>
      <Row>
        <Col md={8}></Col>
        <Col md={4}>
          <h3 className={'text-primary'}>{ADD_UNIT_CONVERSION}</h3>
          
          {/* Show loading indicator until data is fetched */}
          {loading ? (
            <p>Loading units...</p>
          ) : (
            <>
              {/* Include SelectBox for 'From Unit' */}
              <SelectBox
                values={unitIds}
                display_values={unitNames}
                label_name="From Unit"
                form_id="from_unit_select"
              />

              <NumberInput
                label="Multiplier"
                onChangeText={(e) => setValue(e.target.value)}
                form_id="multiplier"
                form_message=""
                placeholder_text="Enter Multiplier"
                min_value={0}
                max_value={1000}
                />

              {/* Include SelectBox for 'To Unit' */}
              <SelectBox
                values={unitIds}
                display_values={unitNames}
                label_name="To Unit"
                form_id="to_unit_select"
              />
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
