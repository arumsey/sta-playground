/* global WebImporter */
export default function parse(element, { document }) {
  // Critical Review: Ensure extraction is dynamic and table structure matches requirements

  // Extract data dynamically from the element
  const titleElement = element.querySelector('.nuv-three-up-content__header__title');
  const buttonElement = element.querySelector('.nuv-button__btn');

  const titleCell = titleElement ? titleElement.textContent.trim() : '';
  const buttonCell = buttonElement ? buttonElement.cloneNode(true) : ''; // Clone button to preserve structure

  // Create header matching example format
  const headerRow = ['Accordion']; // Matches the block type from the example

  // Construct table structure based on the extracted data
  const cells = [
    headerRow, // First row (header)
    [titleCell, buttonCell], // Second row (content)
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}
