/**
 * Menu creates menu UI in spreadsheet.
 */
function createCustomMenu() {
  let menu = SpreadsheetApp.getUi().createMenu("Delete Empty Rows N Columns");

  menu.addItem("Delete External Empty Rows and Columns", "deleteExternalEmptyRowsNColumns");
  menu.addItem("Delete Internal Empty Rows", "deleteInternalEmptyRowsNColumns");
  menu.addToUi();
}

/**
 * OnOpen trigger that creates menu
 * @param {Dictionary} e
 */
function onOpen() {
  createCustomMenu();
}