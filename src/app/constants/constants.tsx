/** Table Fields */
export const ACTONS_FIELD = "සැකසීම්"

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
    //"Unit ID",
    "Unit Name",
    "Abbrevation",
    "Category",
    "Status",
    "Created",
    "Modified"
]


export const UNIT_CATEGORY_TABLE_FIELDS = [
    "ඒකක වර්ගය",
    "තත්වය",
    "වර්ගය",
    "එකතු කිරීම",
    "වෙනස් කිරීම"
]
/** API base routes */
export const UNIT_API = "/api/units/"
export const UNIT_CONVERSION_API = "/api/unit_conversions/"
export const UNIT_CATEGORY_API = "/api/unit_categories/"


/** Default DB values */
export const COMPULSARY = "අත්‍යාවශ්‍ය"
export const OPTIONAL = "අවශ්‍ය"
export const UNIT_CATEGORY_TYPES = [COMPULSARY, OPTIONAL]



/** Log messages */

/** Base */

const BASE_FILL_MESSAGE = " කොටස පුරවන්න"

const BASE_SUCCESSFULLY_ADDED_MESSAGE = " එකතු කිරීම සාර්තකයි!"
const BASE_FAILED_ADD_MESSAGE = " එකතු කිරීම අසාර්තකයි!"

const BASE_SUCCESSFULLY_UPDATED_MESSAGE = " වෙනස් කිරීම සාර්තකයි!"
const BASE_FAILED_UPDATE_MESSAGE = " වෙනස් කිරීම අසාර්තකයි!"

const BASE_SUCCESSFULLY_DELETED_MESSAGE = " ඉවත් කිරීම සාර්තකයි! "
const BASE_FAILED_DELETE_MESSAGE = " ඉවත් කිරීම අසාර්තකයි!"

const BASE_SUCCESSFULLY_RESTORE_MESSAGE = " ප්‍රතිස්ථාපනය කිරීම සාර්ථකයි!"
const BASE_FAILED_RESTORE_MESSAGE = " ප්‍රතිස්ථාපනය කිරීම අසාර්ථකයි!"

const CANNOT_FIND = " සොයාගත නොහැකිය."
const CANNOT_FIND_COUNT = "න් ගණන සොයාගත නොහැකිය"

const DIDNT_CHANGED = " කිසිවක් වෙනස් වූයේ නැත."




/** Unit Category */

const UNIT_CATEGORY = "ඒකක වර්ගය"

export const FILL_UNIT_CATEGORY = UNIT_CATEGORY + BASE_FILL_MESSAGE
export const ADDED_UNIT_CATEGORY = UNIT_CATEGORY + BASE_SUCCESSFULLY_ADDED_MESSAGE
export const FAILED_TO_ADD_UNIT_CATEGORY = UNIT_CATEGORY + BASE_FAILED_ADD_MESSAGE

export const UPDATED_UNIT_CATEGORY = UNIT_CATEGORY + BASE_SUCCESSFULLY_UPDATED_MESSAGE
export const FAILED_TO_UPDATE_UNIT_CATEGORY = UNIT_CATEGORY + BASE_FAILED_UPDATE_MESSAGE

export const DELETED_UNIT_CATEGORY = UNIT_CATEGORY + BASE_SUCCESSFULLY_DELETED_MESSAGE
export const FAILED_TO_DELETE_UNIT_CATEGORY = UNIT_CATEGORY + BASE_FAILED_DELETE_MESSAGE

export const RESTORE_UNIT_CATEGORY = UNIT_CATEGORY + BASE_SUCCESSFULLY_RESTORE_MESSAGE
export const FAILED_TO_RESTORE_UNIT_CATEGORY = UNIT_CATEGORY + BASE_FAILED_RESTORE_MESSAGE

export const CANNOT_FIND_UNIT_CATEGORY = UNIT_CATEGORY + CANNOT_FIND
export const DIDNT_CHANGED_UNIT_CATEGORY = UNIT_CATEGORY + DIDNT_CHANGED

export const CANNOT_FIND_UNIT_CATEGORY_COUNT = UNIT_CATEGORY + CANNOT_FIND_COUNT






/** PRIMARY Keys */

/** Unit Category */
export const UNIT_CATEGORY_PRIMARY_KEY_LETTER = "UNCT"
export const UNIT_CATEGORY_PRIMARY_KEY_FIRST_VALUE = UNIT_CATEGORY_PRIMARY_KEY_LETTER + "1"



/** Page names and forms */

/** Base */
const NEW = "නව"

/** Unit Category */
export const UNIT_CATEGORY_PAGE_NAME = "ඒකක වර්ගය"
export const ADD_UNIT_CATEGORY_PAGE_NAME = NEW + " ඒකක වර්ගය"

export const UNIT_CATEGORY_NAME_LABAL = "ඒකක වර්ගයේ නම :"
export const UNIT_CATEGORY_TYPE_LABAL = "වර්ගය :"
export const UNIT_CATEGORY_NAME_PLACEHOLDER = "ඒකක වර්ගයක් ඇතුලත් කරන්න"