module.exports.UNIT_CATEGORY_LIST = [
    { unit_category_id: 'UNCT1', unit_category_name: 'බර', default_status: 'අත්‍යාවශ්‍ය' }, // Weight
    { unit_category_id: 'UNCT2', unit_category_name: 'උස', default_status: 'අත්‍යාවශ්‍ය' }, // Height
    { unit_category_id: 'UNCT3', unit_category_name: 'පරිමාව', default_status: 'අත්‍යාවශ්‍ය' }, // Volume
    { unit_category_id: 'UNCT4', unit_category_name: 'වර්ගඵලය', default_status: 'අත්‍යාවශ්‍ය' }, // Area
    { unit_category_id: 'UNCT5', unit_category_name: 'තනි ඒකකය', default_status: 'අත්‍යාවශ්‍ය' } // Single Unit
];

module.exports.UNIT_LIST = [
    // බර (UNCT1)
    { unit_id: 'unit01', unit_name: 'කිලෝ ග්‍රෑම්', abbreviation: 'kg', unit_category_id: 'UNCT1' },
    { unit_id: 'unit02', unit_name: 'ග්‍රෑම්', abbreviation: 'g', unit_category_id: 'UNCT1' },
    { unit_id: 'unit18', unit_name: 'ටොන්', abbreviation: 't', unit_category_id: 'UNCT1' },
    { unit_id: 'unit29', unit_name: '50kg සිමෙන්ති කොට්ට', abbreviation: 'Pillows', unit_category_id: 'UNCT1' },

    // උස (UNCT2)
    { unit_id: 'unit03', unit_name: 'මීටර්', abbreviation: 'm', unit_category_id: 'UNCT2' },
    { unit_id: 'unit04', unit_name: 'සෙන්ටිමීටර්', abbreviation: 'cm', unit_category_id: 'UNCT2' },
    { unit_id: 'unit05', unit_name: 'මිලිමීටර්', abbreviation: 'mm', unit_category_id: 'UNCT2' },
    { unit_id: 'unit10', unit_name: 'අඟල්', abbreviation: 'in', unit_category_id: 'UNCT2' },
    { unit_id: 'unit11', unit_name: 'අඩි', abbreviation: 'ft', unit_category_id: 'UNCT2' },

    // පරිමාව (UNCT3)
    { unit_id: 'unit06', unit_name: 'ලීටර්', abbreviation: 'L', unit_category_id: 'UNCT3' },
    { unit_id: 'unit07', unit_name: 'මිලිලීටර්', abbreviation: 'mL', unit_category_id: 'UNCT3' },
    { unit_id: 'unit09', unit_name: 'ඝන මීටර්', abbreviation: 'm³', unit_category_id: 'UNCT3' },
    { unit_id: 'unit15', unit_name: 'ගැලන්', abbreviation: 'gal', unit_category_id: 'UNCT3' },
    { unit_id: 'unit16', unit_name: 'පින්ට්', abbreviation: 'pt', unit_category_id: 'UNCT3' },

    // වර්ගඵලය (UNCT4)
    { unit_id: 'unit08', unit_name: 'වර්ග මීටර්', abbreviation: 'm²', unit_category_id: 'UNCT4' },
    { unit_id: 'unit13', unit_name: 'වර්ග අඩි', abbreviation: 'ft²', unit_category_id: 'UNCT4' },
    { unit_id: 'unit14', unit_name: 'වර්ග අඟල්', abbreviation: 'in²', unit_category_id: 'UNCT4' },

    // ටබ් (UNCT3 පරිමාව)
    { unit_id: 'unit22', unit_name: '1L ටබ්', abbreviation: '1L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit23', unit_name: '2L ටබ්', abbreviation: '2L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit24', unit_name: '3L ටබ්', abbreviation: '3L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit25', unit_name: '4L ටබ්', abbreviation: '4L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit26', unit_name: '5L ටබ්', abbreviation: '5L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit27', unit_name: '10L ටබ්', abbreviation: '10L_Tubs', unit_category_id: 'UNCT3' },
    { unit_id: 'unit28', unit_name: '500ML ටබ්', abbreviation: '500ML_Tubs', unit_category_id: 'UNCT3' }
];




module.exports.UNIT_CONVERSIONS = [
    // බර පරිවර්තන (Weight Conversions)
    { conversion_id: 'CONV01', from_unit: 'unit01', to_unit: 'unit02', value: 1000 },     // කිලෝ ග්‍රෑම් to ග්‍රෑම්
    { conversion_id: 'CONV02', from_unit: 'unit02', to_unit: 'unit01', value: 0.001 },    // ග්‍රෑම් to කිලෝ ග්‍රෑම්
    { conversion_id: 'CONV07', from_unit: 'unit18', to_unit: 'unit01', value: 1000 },     // ටොන් to කිලෝ ග්‍රෑම්
    { conversion_id: 'CONV08', from_unit: 'unit01', to_unit: 'unit18', value: 0.001 },    // කිලෝ ග්‍රෑම් to ටොන්

    // උස පරිවර්තන (Height Conversions)
    { conversion_id: 'CONV09', from_unit: 'unit03', to_unit: 'unit04', value: 100 },      // මීටර් to සෙන්ටිමීටර්
    { conversion_id: 'CONV10', from_unit: 'unit04', to_unit: 'unit03', value: 0.01 },     // සෙන්ටිමීටර් to මීටර්
    { conversion_id: 'CONV11', from_unit: 'unit03', to_unit: 'unit05', value: 1000 },     // මීටර් to මිලිමීටර්
    { conversion_id: 'CONV12', from_unit: 'unit05', to_unit: 'unit03', value: 0.001 },    // මිලිමීටර් to මීටර්
    { conversion_id: 'CONV13', from_unit: 'unit10', to_unit: 'unit03', value: 0.0254 },   // අඟල් to මීටර්
    { conversion_id: 'CONV14', from_unit: 'unit03', to_unit: 'unit10', value: 39.3701 },  // මීටර් to අඟල්
    { conversion_id: 'CONV15', from_unit: 'unit11', to_unit: 'unit10', value: 12 },       // අඩි to අඟල්
    { conversion_id: 'CONV16', from_unit: 'unit10', to_unit: 'unit11', value: 0.0833333 }, // අඟල් to අඩි

    // පරිමාව පරිවර්තන (Volume Conversions)
    { conversion_id: 'CONV19', from_unit: 'unit06', to_unit: 'unit07', value: 1000 },     // ලීටර් to මිලිලීටර්
    { conversion_id: 'CONV20', from_unit: 'unit07', to_unit: 'unit06', value: 0.001 },    // මිලිලීටර් to ලීටර්
    { conversion_id: 'CONV21', from_unit: 'unit15', to_unit: 'unit06', value: 3.78541 },  // ගැලන් to ලීටර්
    { conversion_id: 'CONV22', from_unit: 'unit06', to_unit: 'unit15', value: 0.264172 }, // ලීටර් to ගැලන්
    { conversion_id: 'CONV23', from_unit: 'unit16', to_unit: 'unit06', value: 0.473176 }, // පින්ට් to ලීටර්
    { conversion_id: 'CONV24', from_unit: 'unit06', to_unit: 'unit16', value: 2.11338 },  // ලීටර් to පින්ට්

    // පිහිටීම පරිවර්තන (Area Conversions)
    { conversion_id: 'CONV27', from_unit: 'unit08', to_unit: 'unit13', value: 10.7639 },   // වර්ග මීටර් to වර්ග අඩි
    { conversion_id: 'CONV28', from_unit: 'unit13', to_unit: 'unit08', value: 0.092903 },  // වර්ග අඩි to වර්ග මීටර්
    { conversion_id: 'CONV29', from_unit: 'unit14', to_unit: 'unit10', value: 0.00694444 }, // වර්ග අඟල් to වර්ග අඩි
    { conversion_id: 'CONV30', from_unit: 'unit10', to_unit: 'unit14', value: 144 },       // වර්ග අඩි to වර්ග අඟල්
];

module.exports.ITEM_CATEGORY_LIST = [
    { category_id: 'ICAT01', category_name: 'සිමෙන්ති'},
    { category_id: 'ICAT02', category_name: 'තීන්ත'},
    { category_id: 'ICAT03', category_name: 'වයර්'},
    { category_id: 'ICAT04', category_name: 'තීන්ත බුරුසු'},
    { category_id: 'ICAT05', category_name: 'යතුරු'},
    { category_id: 'ICAT06', category_name: 'මිටි'}
];