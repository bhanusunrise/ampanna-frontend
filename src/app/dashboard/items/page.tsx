'use client';

import BasicTable from "@/app/components/Tables/basic_table";
import { ITEMS_PAGE_NAME, ITEMS_TABLE_FIELDS, COMPULSARY, NULL_VALUE } from "@/app/constants/constants";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { fetchItemsWithUnits } from "./functions";

export default function Page() {
  const [items, setItems] = useState<string[][]>([]);
  const [filteredItems, setFilteredItems] = useState<string[][]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Get YYYY-MM-DD format
  };

  useEffect(() => {
    async function loadData() {
      const fetchedItems = await fetchItemsWithUnits();

      const processedItems = fetchedItems.map((item: any) => {
        // Extract unit names and join them into a single string
        const unitNames = item.units.map((unit: any) => unit.unit_name).join(', ');

        // Check for COMPULSARY units and get the name of the first one found
        const defaultUnit = item.units.find((unit: any) => unit.default_status === COMPULSARY);
        const defaultUnitName = defaultUnit ? defaultUnit.unit_name : NULL_VALUE;

        return [
          item.item_id,
          item.item_name + "\n(" + item.item_category_name + ")",
          item.item_barcode,
          unitNames,  // Use the joined unit names here
          defaultUnitName,  // Add the default unit name or NULL_VALUE
          formatDate(item.createdAt),
          formatDate(item.updatedAt),
          item.status,

        ];
      });

      setItems(processedItems);
      setFilteredItems(processedItems); // Set filteredItems to the same processed items initially
    }

    loadData();
  }, []);

  return (
    <>
      <Row>
        <Col md={3}><h3 className={'text-primary'}>{ITEMS_PAGE_NAME}</h3></Col>
        <Col md={6}>Add searchbar<br/></Col>
      </Row>
      <Row>
        <Col md={9}>
          <BasicTable table_fields={ITEMS_TABLE_FIELDS} table_records={items} table_id='table_1'/>
        </Col>
        <Col md={3}>
        </Col>
      </Row>
    </>
  );
}
