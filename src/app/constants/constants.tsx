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
export const SUPPLIER_TABLE_FIELDS = [
    "සැපයුම්කරුගේ නම",
    "දුරකතන අංකය",
    "පදිංචි ලිපිනය",
    "විද්‍යුත් තැපල් ලිපිනය",
    "එකතු කිරීම",
    "වෙනස් කිරීම",
   /* "තත්වය"*/
]

export const ITEMS_TABLE_FIELDS = [
    "භාණ්ඩය",
    "බාර් කෝඩය",
    "ඒකක වර්ග",
    "බහුල ඒකකය",
    "එකතු කිරීම",
    "වෙනස් කිරීම",
    "තත්වය"
]

export const UNIT_TABLE_FIELDS = [
    //"Unit ID",
    "ඒකකය",
    "සංකේතය",
    "ඒකක වර්ගය",
    "තත්වය",
    "එකතු කිරීම",
    "වෙනස් කිරීම"
]


export const UNIT_CATEGORY_TABLE_FIELDS = [
    "#",
    "ඒකක වර්ගය",
    "විස්තරය",
    "සැකසීම්"
]

export const UNIT_CONVERSION_TABLE_FIELDS = [
    "පළමු ඒකකය",
    "ගුණාකාරය",
    "දෙවන ඒකකය",
    "තත්වය",
    "එකතු කිරීම",
    "වෙනස් කිරීම"
]

export const ITEM_CATEGORIES_TABLE_FIELDS = [
    "භාණ්ඩ වර්ගයේ නම",
    "තත්වය",
    "එකතු කිරීම",
    "වෙනස් කිරීම",
    "සැකසීම්"
]

/** Not found records */
export const NO_RECORDS_FOUND = "සොයාගත නොහැකිය"

export const UNIT_CATEGORIES_SEARCH_PLACEHOLDER = "බර, උස ..."


/** API base routes */
export const UNIT_API = "/api_new/operations/units/"
export const UNIT_CONVERSION_API = "/api_new/operations/unit_conversions/"
export const UNIT_CATEGORY_API = "/api_new/operations/unit_categories/"
export const ITEM_CATEGORY_API = "/api_new/operations/item_categories/"
export const ITEMS_API = "/api_new/operations/items/"
export const SUPPLIER_API = "/api_new/operations/suppliers/"


/** Default DB values */
export const COMPULSARY = "අත්‍යාවශ්‍ය"
export const OPTIONAL = "අවශ්‍ය"
export const UNIT_CATEGORY_TYPES = [COMPULSARY, OPTIONAL]

/** Default status values */
export const ACTIVE_ITEM = "සක්‍රීය"
export const DELETED_ITEM = "අක්‍රීය"

/** Default null/ not null values */
export const NULL_VALUE = "නැත"
export const NOT_NULL_VALUE = "ඇත"


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
const FIRST = "පළමු"
const SECOND = "දෙවන"
export const UPDATE = " වෙනස් කරන්න"
export const RESTORE = "ප්‍රතිස්ථාපනය කිරීම"
export const RESTORE_CONFIRM = " ප්‍රතිස්ථාපනය කිරීම තහවුරු කරන්න"
export const DELETE_CONFIRM = " ඉවත් කිරීම තහවුරු කරන්න"
export const BACK = "ආපසු"
export const DELTETION = "ඉවත් කිරීම"
export const SEARCH = "සෙවුම් කරන්න"

/** Unit Category */
export const UNIT_CATEGORY_PAGE_NAME = "ඒකක වර්ග"
export const ADD_UNIT_CATEGORY_PAGE_NAME = NEW + " ඒකක වර්ගය"

export const UNIT_CATEGORY_NAME_LABAL = "ඒකක වර්ගයේ නම :"
export const UNIT_CATEGORY_DESCRIPTION_LABAL = "විස්තරය :"
export const UNIT_CATEGORY_NAME_PLACEHOLDER = "ඒකක වර්ගයක් ඇතුලත් කරන්න"
export const UNIT_CATEGORY_DESCRIPTION_PLACEHOLDER = "විස්තරයක් ඇතුලත් කරන්න"

export const UPDATE_UNIT_CATEGORY_MODEL_TITLE = UNIT_CATEGORY_PAGE_NAME + UPDATE




/** Unit */
export const UNIT_PAGE_NAME = "ඒකක"
export const NEW_UNIT_TITLE = NEW + " ඒකකය"

export const UNIT_NAME_LABAL = "ඒකකයේ නම"
export const UNIT_ABBRAVIATION_LABAL = "සංකේතය"
export const UNIT_NAME_PLACEHOLDER = "ඒකකයක් ඇතුලත් කරන්න"
export const UNIT_ABBRAVIATION_PLACEHOLDER = "සංකේතයක් ඇතුලත් කරන්න"

export const UPDATE_UNIT_MODEL_TITLE = UNIT_PAGE_NAME + UPDATE


/** Unit Conversion */
export const UNIT_CONVERSION_PAGE_NAME = "ඒකක පරිවර්ථන"
export const ADD_UNIT_CONVERSION = NEW + " ඒකක පරිවර්ථනය"

export const FIRST_UNIT_NAME_LABAL = FIRST + " " + UNIT_NAME_LABAL
export const SECOND_UNIT_NAME_LABAL = SECOND + " " + UNIT_NAME_LABAL
export const MULTIPLIER_LABAL = "ගුණාකාරය"
export const FIRST_UNIT_LABEL = FIRST + " " + UNIT_ABBRAVIATION_LABAL
export const SECOND_UNIT_LABEL = SECOND + " " + UNIT_ABBRAVIATION_LABAL
export const MULTIPLIER_PLACEHOLDER = "ගුණාකාරයක් ඇතුලත් කරන්න"

export const UPDATE_UNIT_CONVERSION_MODEL_TITLE = UNIT_PAGE_NAME + UPDATE


/** Items */
export const ITEMS_PAGE_NAME = "භාණ්ඩ"
export const ADD_ITEM_PAGE_NAME = NEW + " භාණ්ඩය"

export const ITEM_CATEGORY_SELECTION_LABAL = "භාණ්ඩ වර්ගය"
export const ITEM_INPUT_LABAL = "භාණ්ඩය"
export const ITEM_INPUT_PLACEHOLDER = "භාණ්ඩයේ නම ඇතුළත් කරන්න"
export const UNIT_TYPE_SELECTION_PLACEHOLDER = "භාණ්ඩ වර්ගය තෝරන්න"
export const ADD_UNIT_CATEGORY_LABAL = "ඒකක වර්ගය"
export const ADD_UNITS_LABAL = "ඒකක"
export const ADD_MOST_USED_UNIT_LABAL = "බහුල ඒකකය"
export const UPDATE_ITEM_MODEL_TITLE = ITEMS_PAGE_NAME + UPDATE


/** Item Categories */
export const ITEM_CATEGORIES_PAGE_NAME = "භාණ්ඩ වර්ග"
export const ADD_ITEM_CATEGORY = NEW + " භාණ්ඩ වර්ගය"

export const ITEM_CATEGORY_NAME_LABAL = "භාණ්ඩ වර්ගයේ නම"
export const ITEM_CATEGORY_NAME_PLACEHOLDER = "භාණ්ඩ වර්ගයක් ඇතුලත් කරන්න"
export const UNIT_NAMES_LABAL = "ගණනය කිරීමට යොදාගන්න ඒකක"
export const DEFAULT_UNIT_NAME_LABAL = "බහුලවම භාවිතා වන ඒකකය"

export const UPDATE_ITEM_CATEGORY_MODEL_TITLE = ITEM_CATEGORIES_PAGE_NAME + UPDATE


/** Suppliers */

export const SUPPLIERS_PAGE_NAME = "සැපයුම්කරුවන්"
export const ADD_SUPPLIER = NEW + " සැපයුම්කරු"

export const SUPPLIER_NAME_LABAL = "සැපයුම්කරු නම"
export const SUPPLIER_NAME_PLACEHOLDER = "සැපයුම්කරුයේ නම ඇතුලත් කරන්න"
export const SUPPLIER_ADDRESS_LABAL = "සැපයුම්කරු ලිපිනය"
export const SUPPLIER_ADDRESS_PLACEHOLDER = "සැපයුම්කරුයේ ලිපිනය ඇතුලත් කරන්න"
export const SUPPLIER_PHONE_LABAL = "සැපයුම්කරු දුරකථන"
export const SUPPLIER_PHONE_PLACEHOLDER = "දුරකථන ඇතුලත් කරන්න"
export const SUPPLIER_EMAIL_LABAL = "ඊමේල් ලිපිනය"
export const SUPPLIER_EMAIL_PLACEHOLDER = "ඊමේල් ලිපිනය ඇතුලත් කරන්න"




/*** Buttons */
export const ADD_BUTTON_LABAL = "එකතු කරන්න"
export const CLEAR_BUTTON_LABAL  = "මකන්න"
export const UPDATE_BUTTON_LABAL = "✏️"
export const DELETE_BUTTON_LABAL = "🗑️"
export const RESTORE_BUTTON_LABAL = "🔁"
export const DELETE_BUTTON_DELETE_MODAL = "ඉවත් කරන්න"
export const UPDATE_BUTTON_UPDATE_MODAL = "වෙනස් කරන්න"
export const DELETE_CONFIRM_MESSEGE = "ඔබට විශ්වාසද ඉවත් කිරීම?"


/** Select Box */
export const SELECT_BOX_PLACEHOLDER = "තෝරාගන්න"




/** Logos */
export const LOGO_WHITE_PATH = "/logo_white.png"