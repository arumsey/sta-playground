/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Embed'];

  // Validate element contents
  const contentContainer = element.querySelector('.col-xs-6 strong');
  const dateContainer = element.querySelector('.col-xs-6.text-right strong');

  // Extract relevant content
  const contentText = contentContainer ? contentContainer.textContent.trim() : '';
  const dateText = dateContainer ? dateContainer.textContent.trim() : '';

  // Combine the extracted content into a single cell in the second row
  const combinedContent = `${contentText} - ${dateText}`;

  // Ensure the structure matches the example
  const cells = [
    headerRow, // Header row from example, exactly one column
    [combinedContent], // Single column in the second row
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new structured block table
  element.replaceWith(block);
}