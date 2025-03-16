'use client'

interface search_handler_props {
  search_value: string;
  table_values: string[][];
  fields: string[];
  setFilteredData: (data: string[][]) => void;
}

export const search_handler = ({
  search_value,
  table_values,
  setFilteredData,
}: search_handler_props) => {
  // Filter table_values based on the search input
  const filtered = table_values.filter((row) =>
    row.some((value) =>
      value.toLowerCase().includes(search_value.toLowerCase())
    )
  );

  // Update the filtered data
  setFilteredData(filtered);
};
