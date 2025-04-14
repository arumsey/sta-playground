/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = element.querySelector('h2') ? element.querySelector('h2').textContent.trim() : '';

  // Extract the first paragraph before the tables
  const introduction = element.querySelector('p:not(.accordions__toggler)') ? element.querySelector('p:not(.accordions__toggler)').textContent.trim() : '';

  // Select the relevant table: the first visible table
  const table = element.querySelector('table');
  const rows = table ? table.querySelectorAll('tbody tr') : [];

  const tableData = [];
  rows.forEach(row => {
    const cells = row.querySelectorAll('td');
    const rowContent = [];

    cells.forEach(cell => {
      rowContent.push(cell.textContent.trim()); // Use raw text content instead of innerHTML
    });

    tableData.push(rowContent);
  });

  // Format table for block creation
  const formattedTable = tableData.map(row => {
    const titleCell = row[0]; // Extract plain text for the title
    const contentCell = row[1]; // Extract plain text for the content

    return [titleCell, contentCell];
  });

  // Create and replace block table
  const headerRow = ['Accordion'];
  const block = WebImporter.DOMUtils.createTable([headerRow, ...formattedTable], document);

  element.replaceWith(block);
}