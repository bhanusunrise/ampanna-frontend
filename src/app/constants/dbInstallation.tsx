module.exports.UNIT_LIST = [
    { unit_id: 'unit01', unit_name: 'Kilogram', abbreviation: 'kg' },
    { unit_id: 'unit02', unit_name: 'Gram', abbreviation: 'g' },
    { unit_id: 'unit03', unit_name: 'Meter', abbreviation: 'm' },
    { unit_id: 'unit04', unit_name: 'Centimeter', abbreviation: 'cm' },
    { unit_id: 'unit05', unit_name: 'Millimeter', abbreviation: 'mm' },
    { unit_id: 'unit06', unit_name: 'Liter', abbreviation: 'L' },
    { unit_id: 'unit07', unit_name: 'Milliliter', abbreviation: 'mL' },
    { unit_id: 'unit08', unit_name: 'Square Meter', abbreviation: 'm²' },
    { unit_id: 'unit09', unit_name: 'Cubic Meter', abbreviation: 'm³' },
    { unit_id: 'unit10', unit_name: 'Inch', abbreviation: 'in' },
    { unit_id: 'unit11', unit_name: 'Foot', abbreviation: 'ft' },
    { unit_id: 'unit12', unit_name: 'Yard', abbreviation: 'yd' },
    { unit_id: 'unit13', unit_name: 'Square Foot', abbreviation: 'ft²' },
    { unit_id: 'unit14', unit_name: 'Square Inch', abbreviation: 'in²' },
    { unit_id: 'unit15', unit_name: 'Gallon', abbreviation: 'gal' },
    { unit_id: 'unit16', unit_name: 'Pint', abbreviation: 'pt' },
    { unit_id: 'unit17', unit_name: 'Quart', abbreviation: 'qt' },
    { unit_id: 'unit18', unit_name: 'Ton', abbreviation: 't' },
    { unit_id: 'unit19', unit_name: 'Pound', abbreviation: 'lb' },
    { unit_id: 'unit20', unit_name: 'Ounce', abbreviation: 'oz' },
    { unit_id: 'unit21', unit_name: 'Single Unit', abbreviation: 'Items' },
    { unit_id: 'unit22', unit_name: '1L Tub', abbreviation: '1L_Tubs' },
    { unit_id: 'unit23', unit_name: '2L Tub', abbreviation: '2L_Tubs' },
    { unit_id: 'unit24', unit_name: '3L Tub', abbreviation: '3L_Tubs' },
    { unit_id: 'unit25', unit_name: '4L Tub', abbreviation: '4L_Tubs' },
    { unit_id: 'unit26', unit_name: '5L Tub', abbreviation: '5L_Tubs' },
    { unit_id: 'unit27', unit_name: '10L Tub', abbreviation: '10L_Tubs' },
    { unit_id: 'unit28', unit_name: '500ml Tub', abbreviation: '500ML_Tubs' },
    { unit_id: 'unit29', unit_name: '50KG Pillow', abbreviation: 'Cement Pillows' },
];


module.exports.UNIT_CONVERSIONS = [
      // Weight Conversions
  { conversion_id: 'conv01', from_unit: 'unit01', to_unit: 'unit02', value: 1000 },    // Kilogram to Gram
  { conversion_id: 'conv02', from_unit: 'unit02', to_unit: 'unit01', value: 0.001 },   // Gram to Kilogram
  { conversion_id: 'conv03', from_unit: 'unit19', to_unit: 'unit01', value: 0.453592 }, // Pound to Kilogram
  { conversion_id: 'conv04', from_unit: 'unit01', to_unit: 'unit19', value: 2.20462 },  // Kilogram to Pound
  { conversion_id: 'conv05', from_unit: 'unit19', to_unit: 'unit20', value: 16 },       // Pound to Ounce
  { conversion_id: 'conv06', from_unit: 'unit20', to_unit: 'unit19', value: 0.0625 },   // Ounce to Pound
  { conversion_id: 'conv07', from_unit: 'unit18', to_unit: 'unit01', value: 1000 },     // Ton to Kilogram
  { conversion_id: 'conv08', from_unit: 'unit01', to_unit: 'unit18', value: 0.001 },    // Kilogram to Ton

  // Length Conversions
  { conversion_id: 'conv09', from_unit: 'unit03', to_unit: 'unit04', value: 100 },     // Meter to Centimeter
  { conversion_id: 'conv10', from_unit: 'unit04', to_unit: 'unit03', value: 0.01 },    // Centimeter to Meter
  { conversion_id: 'conv11', from_unit: 'unit03', to_unit: 'unit05', value: 1000 },    // Meter to Millimeter
  { conversion_id: 'conv12', from_unit: 'unit05', to_unit: 'unit03', value: 0.001 },   // Millimeter to Meter
  { conversion_id: 'conv13', from_unit: 'unit10', to_unit: 'unit03', value: 0.0254 },  // Inch to Meter
  { conversion_id: 'conv14', from_unit: 'unit03', to_unit: 'unit10', value: 39.3701 }, // Meter to Inch
  { conversion_id: 'conv15', from_unit: 'unit11', to_unit: 'unit10', value: 12 },      // Foot to Inch
  { conversion_id: 'conv16', from_unit: 'unit10', to_unit: 'unit11', value: 0.0833333 },// Inch to Foot
  { conversion_id: 'conv17', from_unit: 'unit12', to_unit: 'unit11', value: 3 },       // Yard to Foot
  { conversion_id: 'conv18', from_unit: 'unit11', to_unit: 'unit12', value: 0.333333 },// Foot to Yard

  // Volume Conversions
  { conversion_id: 'conv19', from_unit: 'unit06', to_unit: 'unit07', value: 1000 },    // Liter to Milliliter
  { conversion_id: 'conv20', from_unit: 'unit07', to_unit: 'unit06', value: 0.001 },   // Milliliter to Liter
  { conversion_id: 'conv21', from_unit: 'unit15', to_unit: 'unit06', value: 3.78541 }, // Gallon to Liter
  { conversion_id: 'conv22', from_unit: 'unit06', to_unit: 'unit15', value: 0.264172 },// Liter to Gallon
  { conversion_id: 'conv23', from_unit: 'unit16', to_unit: 'unit06', value: 0.473176 },// Pint to Liter
  { conversion_id: 'conv24', from_unit: 'unit06', to_unit: 'unit16', value: 2.11338 }, // Liter to Pint
  { conversion_id: 'conv25', from_unit: 'unit17', to_unit: 'unit06', value: 0.946353 },// Quart to Liter
  { conversion_id: 'conv26', from_unit: 'unit06', to_unit: 'unit17', value: 1.05669 }, // Liter to Quart

  // Area Conversions
  { conversion_id: 'conv27', from_unit: 'unit08', to_unit: 'unit13', value: 10.7639 },  // Square Meter to Square Foot
  { conversion_id: 'conv28', from_unit: 'unit13', to_unit: 'unit08', value: 0.092903 }, // Square Foot to Square Meter
  { conversion_id: 'conv29', from_unit: 'unit14', to_unit: 'unit10', value: 0.00694444 }, // Square Inch to Square Foot
  { conversion_id: 'conv30', from_unit: 'unit10', to_unit: 'unit14', value: 144 },      // Square Foot to Square Inch

]
