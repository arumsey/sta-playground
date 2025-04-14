/* global WebImporter */
export default function parse(element, { document }) {
  const tableSections = element.querySelectorAll('.table-responsive');

  // Create the table header row for the block
  const headerRow = ['Table (striped, bordered)'];

  // Extract data from each table
  const extractedTables = [];

  tableSections.forEach((tableContainer) => {
    const table = tableContainer.querySelector('table');
    if (!table) return;

    const currentTableData = [];

    // Extract header information (if available)
    const thead = table.querySelector('thead');
    const headers = [];
    if (thead) {
      thead.querySelectorAll('tr').forEach((headerRow) => {
        const headerCells = [];
        headerRow.querySelectorAll('th').forEach((headerCell) => {
          headerCells.push(headerCell.textContent.trim().replace(/\s+/g, ' '));
        });
        if (headerCells.length > 0) {
          currentTableData.push(headerCells);
        }
      });
    }

    // Extract the table's row data
    const tbody = table.querySelector('tbody');
    if (tbody) {
      tbody.querySelectorAll('tr').forEach((row) => {
        const rowCells = [];
        row.querySelectorAll('td').forEach((cell) => {
          rowCells.push(cell.textContent.trim().replace(/\s+/g, ' '));
        });
        if (rowCells.length > 0) {
          currentTableData.push(rowCells);
        }
      });
    }

    if (currentTableData.length > 0) {
      extractedTables.push(currentTableData);
    }
  });

  // Create standardized block tables
  const blockTables = extractedTables.map((tableData) => {
    const combinedTable = [headerRow, ...tableData];
    return WebImporter.DOMUtils.createTable(combinedTable, document);
  });

  // Build the final structure
  const finalStructure = document.createElement('div');
  blockTables.forEach((table) => {
    finalStructure.appendChild(table);
    const divider = document.createElement('hr');
    finalStructure.appendChild(divider);
  });

  // Replace the original element
  element.replaceWith(finalStructure);
  return finalStructure;
}