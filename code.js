/**
 * Delete the rows and columns outside of the DataRange()
 */
function deleteExternalEmptyRowsNColumns() {
  // get sheets and data
  const ss = SpreadsheetApp.getActiveSheet();
  const data = ss.getDataRange().getValues();

  //console.log(data);

  // determine last row and column
  const lastRow = data.length;
  const lastCol = data[0].length;

  // get maximum rows and columns sss
  const maxRows = ss.getMaxRows();
  const maxCols = ss.getMaxColumns();

  // only remove rows and columns if there are empty rows or columns beyond last row and columns
  if (maxRows > lastRow) {
    ss.deleteRows(lastRow + 1, maxRows - lastRow);
  }
  if (maxCols > lastCol) {
    ss.deleteColumns(lastCol + 1, maxCols - lastCol);
  }

}

/**
 * Deletes the empty rows and columns inside of DataRange()
 */
function deleteInternalEmptyRowsNColumns() {
  // get sheets and data
  const ss = SpreadsheetApp.getActiveSheet();
  const data = ss.getDataRange().getValues();

  const lastRow = data.length;
  const lastCol = data[0].length;

  // lets check if there're any empty columns during the beginning which is included in data
  const emptyColumnIndexes = [];
  for (let i = 1; i <= lastCol; i++) {
    if (ss.getRange(1, i, lastRow, 1).getValues().flat().join("") === "") {
      // subtract length before pushes value with less than 1 of original index
      // because later on when we delete colums one by one the indexes 
      //will be out of bounds/wrong due to sprd being updated to new indexes
      emptyColumnIndexes.push(i - emptyColumnIndexes.length);

    }

  }

  // lets delete these columns
  if (emptyColumnIndexes.length > 0) {
    // delete column
    emptyColumnIndexes.forEach(ind => ss.deleteColumn(ind));

  }

  //***************Remove Internal empty rows */
  // convert nested arrays to string and remove empty strings with filter
  const newData = ss.getDataRange().getValues().filter((arr) => arr.join("") !== "")

  const newLastRow = newData.length;
  const newLastCol = newData[0].length;

  // clear previous values
  ss.clearContents();

  // set new values
  ss.getRange(1, 1, newLastRow, newLastCol).setValues(newData);


}