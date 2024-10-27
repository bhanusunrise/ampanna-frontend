/** Table Fields */

/** Calculator Table */
export const CALCULATOR_TABLE_FIELDS = [
    "Item_Code", 
    "Item_Name", 
    "Unit_Price",
    "Unit",
    "Quantity",
    "Warrenty",
    "Sub Total"
]

/** customer Table */
export const CUSTOMER_TABLE_FIELDS = [
    "Customer_ID",
    "Customer_Name",
    "Customer_Address",
    "Customer_Phone",
    "Customer_Email",
    "Warrenty Items",
    "Warrenty Status"
]

export const ITEMS_TABLE_FIELDS = [
    "Item_ID",
    "Item_Name",
    "Item_Category",
    "Item_Units",
]

export const UNIT_TABLE_FIELDS = [
    "Unit ID",
    "Unit Name",
    "Abbrevation",
    "Status"
]

/** API base routes */
export const UNIT_API = "/api/units/"
export const UNIT_CONVERSION_API = "/api/unit_conversions/"
export const UNIT_CATEGORY_API = "/api/unit_categories/"



/** Log messages */

/** Base */

const BASE_FILL_MESSAGE = "Please fill "

const BASE_SUCCESSFULLY_ADDED_MESSAGE = "Added "
const BASE_FAILED_ADD_MESSAGE = "Failed to add "

const BASE_SUCCESSFULLY_UPDATED_MESSAGE = "Updated "
const BASE_FAILED_UPDATE_MESSAGE = "Failed to update "

const BASE_SUCCESSFULLY_DELETED_MESSAGE = "Deleted "
const BASE_FAILED_DELETE_MESSAGE = "Failed to delete "

/** Unit Category */

export const FILL_UNIT_CATEGORY = BASE_FILL_MESSAGE +  "unit category."
export const ADDED_UNIT_CATEGORY = BASE_SUCCESSFULLY_ADDED_MESSAGE + "unit category."
export const FAILED_TO_ADD_UNIT_CATEGORY = BASE_FAILED_ADD_MESSAGE + "unit category."

export const UPDATED_UNIT_CATEGORY = BASE_SUCCESSFULLY_UPDATED_MESSAGE + "unit category."
export const FAILED_TO_UPDATE_UNIT_CATEGORY = BASE_FAILED_UPDATE_MESSAGE + "unit category."

export const DELETED_UNIT_CATEGORY = BASE_SUCCESSFULLY_DELETED_MESSAGE + "unit category."
export const FAILED_TO_DELETE_UNIT_CATEGORY = BASE_FAILED_DELETE_MESSAGE + "unit category."






/** PRIMARY Keys */

/** Unit Category */
export const UNIT_CATEGORY_PRIMARY_KEY_LETTER = "UNCT"
export const UNIT_CATEGORY_PRIMARY_KEY_FIRST_VALUE = UNIT_CATEGORY_PRIMARY_KEY_LETTER + "1"