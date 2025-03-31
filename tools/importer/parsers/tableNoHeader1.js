/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Table (no header)']; // Define header row

  const img = element.cloneNode(true); // Clone the image to ensure we maintain the structure

  const dataRows = [
    [img] // The table content rows, in this case containing the cloned image
  ];

  // Combine header row with data rows for table creation
  const tableData = [headerRow, ...dataRows];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(tableBlock);
}
