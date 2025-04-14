/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (striped & bordered)'];
  const sections = [];

  // Extract data from tables and transform them into block tables
  const tables = element.querySelectorAll('table');

  tables.forEach((table) => {
    const rows = table.querySelectorAll('tbody > tr');
    const tableData = Array.from(rows).map(row => {
      return Array.from(row.cells).map(cell => cell.textContent.trim());
    });

    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...tableData], document);
    sections.push(blockTable);
  });

  // Create sections with <hr> between each table
  const newStructure = document.createElement('div');

  sections.forEach((section, index) => {
    newStructure.appendChild(section);
    if (index < sections.length - 1) {
      newStructure.appendChild(document.createElement('hr'));
    }
  });

  // Replace the original element with the new structure
  element.replaceWith(newStructure);
}