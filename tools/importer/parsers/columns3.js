/* global WebImporter */
export default function parse(element, { document }) {
  // Validate headers
  const headerRow = ['Columns'];

  // Extract content from left column dynamically
  const leftColElement = element.querySelector('div.row div.col-xs-12.col-sm-7');
  const leftColumn = document.createElement('div');
  leftColumn.innerHTML = leftColElement ? leftColElement.innerHTML : '';

  // Extract content from right column dynamically
  const rightColElement = element.querySelector('div.row div.col-xs-12.col-sm-5');
  const rightColumn = document.createElement('div');
  rightColumn.innerHTML = rightColElement ? rightColElement.innerHTML : '';

  // Prepare rows and columns for the table
  const cells = [
    headerRow, // Header row must match example
    [leftColumn, rightColumn] // Two-column layout content dynamically populated
  ];

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}