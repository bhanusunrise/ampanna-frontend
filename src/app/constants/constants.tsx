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
    "#",
    "නම",
    "විස්තරය",
    "දුරකතන අංක",
    "ලිපින",
    "ඊ මේල්",
    "වෙබ් අඩවි",
    "සැකසීම්"
]

export const ITEMS_TABLE_FIELDS = [
    "#",
    "භාණ්ඩය",
    "බාර් කෝඩය",
    "ඒකකය",
    "වෙනත් ඒකක",
    "විස්තරය",
    "වෙනත් පරාමිතීන්",
    "සැකසීම්"
]

export const UNIT_TABLE_FIELDS = [
    "#",
    "ඒකකය",
    "ඒකක වර්ගය",
    "විස්තරය",
    "සැකසීම්"
]


export const UNIT_CATEGORY_TABLE_FIELDS = [
    "#",
    "ඒකක වර්ගය",
    "විස්තරය",
    "සැකසීම්"
]

export const UNIT_CONVERSION_TABLE_FIELDS = [
    "#",
    "විස්තරය",
    "පළමු ඒකකය",
    "ගුණාකාරය",
    "දෙවන ඒකකය",
    "සැකසීම්"
]

export const STOCK_TABLE_FIELDS = [
    "#",
    "තොගය",
    "විස්තරය",
    "සැපයුම්කරු",
    "භාණ්ඩය",
    "ලැබුණු දිනය",
    "මුලු එකතුව",
    "විකුණුම්",
    "අබලන්",
    "ගැනුම් මිළ",
    "විකුණුම් මිළ",
    "වට්ටම්",
    "සැකසීම්"
]


/** Not found records */
export const NO_RECORDS_FOUND = "සොයාගත නොහැකිය"

export const UNIT_CATEGORIES_SEARCH_PLACEHOLDER = "බර, උස ..."
export const ITEMS_SEARCH_PLACEHOLDER = "තීන්ත, සිමෙන්ති ..."


/** API base routes */
export const UNIT_API = "/api_new/operations/units/"
export const UNIT_CONVERSION_API = "/api_new/operations/unit_conversions/"
export const UNIT_CATEGORY_API = "/api_new/operations/unit_categories/"
export const ITEM_CATEGORY_API = "/api_new/operations/item_categories/"
export const ITEMS_API = "/api_new/operations/items/"
export const SUPPLIER_API = "/api_new/operations/suppliers/"
export const STOCKS_API = "/api_new/operations/stocks/"


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

export const UNITS_SEARCH_PLACEHOLDER = "කිලෝග්‍රෑම්, මීටර් ..."


/** Unit Conversion */
export const UNIT_CONVERSION_PAGE_NAME = "ඒකක පරිවර්ථන"
export const ADD_UNIT_CONVERSION = NEW + " ඒකක පරිවර්ථනය"

export const FIRST_UNIT_NAME_LABAL = FIRST + " " + UNIT_NAME_LABAL
export const SECOND_UNIT_NAME_LABAL = SECOND + " " + UNIT_NAME_LABAL
export const MULTIPLIER_LABAL = "ගුණාකාරය"
export const FIRST_UNIT_LABEL = FIRST + " " + UNIT_ABBRAVIATION_LABAL
export const SECOND_UNIT_LABEL = SECOND + " " + UNIT_ABBRAVIATION_LABAL
export const MULTIPLIER_PLACEHOLDER = "ගුණාකාරයක් ඇතුලත් කරන්න"

export const UPDATE_UNIT_CONVERSION_MODEL_TITLE = UNIT_CONVERSION_PAGE_NAME + UPDATE


/** Items */
export const ITEMS_PAGE_NAME = "භාණ්ඩ"
export const ADD_ITEM = NEW + " භාණ්ඩය"

export const ITEM_CATEGORY_SELECTION_LABAL = "භාණ්ඩ වර්ගය"
export const ITEM_INPUT_LABAL = "භාණ්ඩය"
export const ITEM_INPUT_PLACEHOLDER = "භාණ්ඩයේ නම ඇතුළත් කරන්න"
export const UNIT_TYPE_SELECTION_PLACEHOLDER = "භාණ්ඩ වර්ගය තෝරන්න"
export const ADD_UNIT_CATEGORY_LABAL = "ඒකක වර්ගය"
export const ADD_UNITS_LABAL = "ඒකක"
export const ADD_MOST_USED_UNIT_LABAL = "බහුල ඒකකය"
export const UPDATE_ITEM_MODEL_TITLE = ITEMS_PAGE_NAME + UPDATE
export const OTHER_PARAMETERS_NAME = "පරාමිතිය"
export const OTHER_PARAMETERS_VALUE = "අගය"
export const ADD_5_ROWS = "පේලි 5ක් එකතු කරන්න"


/** Suppliers */

export const SUPPLIERS_PAGE_NAME = "සැපයුම්කරුවන්"
export const ADD_SUPPLIER = NEW + " සැපයුම්කරු"
export const SUPPLIER_SEARCH_PLACEHOLDER = "වගීෂ පේන්ට්ස්, චිරන්ත බ්ලොක් ගල් ..."
export const SUPPLIER_NAME_LABAL = "නම"
export const SUPPLIER_NAME_PLACEHOLDER = "සැපයුම්කරුයේ නම ඇතුලත් කරන්න"
export const SUPPLIER_ADDRESS_LABAL = "සැපයුම්කරු ලිපිනය"
export const SUPPLIER_ADDRESS_PLACEHOLDER = "සැපයුම්කරුයේ ලිපිනය ඇතුලත් කරන්න"
export const SUPPLIER_PHONE_LABAL = "සැපයුම්කරු දුරකථන"
export const SUPPLIER_PHONE_PLACEHOLDER = "දුරකථන ඇතුලත් කරන්න"
export const SUPPLIER_EMAIL_LABAL = "ඊමේල් ලිපිනය"
export const SUPPLIER_EMAIL_PLACEHOLDER = "ඊමේල් ලිපිනය ඇතුලත් කරන්න"
export const UPDATE_SUPPLIER_MODEL_TITLE = SUPPLIERS_PAGE_NAME + UPDATE


/** Stocks */
export const STOCKS_PAGE_NAME = "තොග"
export const ADD_STOCK = NEW + " තොගය"
export const STOCK_SEARCH_PLACEHOLDER = "2025-පෙබරවාරි, 2025-මාර්තු ..."
export const STOCK_NAME_LABAL = "තොගය"
export const STOCK_NAME_PLACEHOLDER = "තොගයේ නම ඇතුලත් කරන්න"
export const STOCK_DESCRIPTION_LABAL = "විස්තරය"
export const STOCK_DESCRIPTION_PLACEHOLDER = "තොගයේ විස්තරය ඇතුලත් කරන්න"
export const STOCK_SUPPLIER_LABAL = "සැපයුම්කරු"
export const STOCK_SUPPLIER_PLACEHOLDER = "සැපයුම්කරු තෝරන්න"
export const STOCK_PURCHASE_DATE_LABAL = "මිළදී ගත් දිනය"
export const STOCK_PURCHASE_DATE_PLACEHOLDER = "මිළදී ගත් දිනය ඇතුලත් කරන්න"
export const STOCK_TOTAL_AMOUNT_LABAL = "මුළු එකතුව"
export const STOCK_TOTAL_AMOUNT_PLACEHOLDER = "මුළු එකතුව ඇතුලත් කරන්න"
export const STOCK_ITEM_LABAL = "භාණ්ඩය"
export const STOCK_ITEM_PLACEHOLDER = "භාණ්ඩය තෝරන්න"
export const STOCK_BUYING_PRICE_LABAL = "ගැනුම් මිළ"
export const STOCK_BUYING_PRICE_PLACEHOLDER = "ගැනුම් මිළ ඇතුලත් කරන්න"
export const STOCK_SELLING_PRICE_LABAL = "විකිණුම් මිළ"
export const STOCK_SELLING_PRICE_PLACEHOLDER = "විකිණුම් මිළ ඇතුලත් කරන්න"
export const STOCK_DISCOUNT_LABAL = "වට්ටම්"
export const STOCK_DISCOUNT_PLACEHOLDER = "වට්ටම් ඇතුලත් කරන්න"
export const STOCK_START_DATE_LABAL = "වට්ටම් ආරම්භක දිනය"
export const STOCK_END_DATE_LABAL = "වට්ටම් අවසන් දිනය"




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