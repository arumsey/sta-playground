/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to process the tables and extract data
  function extractTableData(table) {
    const rows = [];

    // Dynamically extract the header row based on appropriate <th> content
    const headerTitleElement = table.querySelector('thead th[colspan]') || table.querySelector('thead th');
    const headerTitle = headerTitleElement?.textContent?.trim() || 'Missing Header';

    // Create the header row with extracted title
    const headerRow = [headerTitle];
    rows.push(headerRow);

    // Process table content rows
    const dataRows = table.querySelectorAll('tbody tr');
    dataRows.forEach((row) => {
      const cells = Array.from(row.querySelectorAll('td'));
      const rowData = cells.map((cell) => {
        // Sanitize encoded HTML entities and trailing spaces
        return cell.textContent.replace(/\u00a0/g, ' ').trim();
      });
      rows.push(rowData);
    });

    return rows;
  }

  const blocks = [];

  // Process each table in sequence
  const tables = element.querySelectorAll("div.table-responsive > table");
  tables.forEach((table, index) => {
    const data = extractTableData(table);
    const block = WebImporter.DOMUtils.createTable(data, document);
    blocks.push(block);

    // Add separator if it's not the last table
    if (index < tables.length - 1) {
      const hr = document.createElement('hr');
      blocks.push(hr);
    }
  });

  // Replace original content with new blocks
  element.replaceChildren(...blocks);
}