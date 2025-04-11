/* global WebImporter */
export default function parse(element, { document }) {
  const columnsHeader = ['Columns'];

  // Extracting content dynamically from the element
  const title = element.querySelector('h2');
  const paragraph = element.querySelector('p');
  const image = element.querySelector('picture img');

  // Handling edge cases for empty or missing data
  const contentCell = [];
  if (title) contentCell.push(title.cloneNode(true)); // Ensuring proper handling of <h2>
  if (paragraph) contentCell.push(paragraph.cloneNode(true)); // Ensuring proper handling of <p>

  const imageCell = image ? [image.cloneNode(true)] : ['']; // Ensuring proper handling of images

  // Building the table data dynamically
  const tableData = [
    columnsHeader, // Header row accurately matching example
    [contentCell, imageCell], // Content row with extracted text and image
  ];

  // Using the provided helper function to create the block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the original element with the new table block
  element.replaceWith(block);
}