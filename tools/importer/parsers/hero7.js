/* global WebImporter */
export default function parse(element, { document }) {
  // Validate if required elements exist
  const imageElement = element.querySelector('picture img');
  const headingElement = element.querySelector('h1');

  // Handle cases with missing image or heading
  if (!imageElement && !headingElement) {
    return; // Exit early if no content exists for processing
  }

  // Extract dynamic content
  const headerRow = ['Hero']; // As per the example block structure

  // Create an HR element for section separation
  const hrElement = document.createElement('hr');

  // Format the content dynamically based on available elements
  const contentRow = [];
  if (imageElement) contentRow.push(imageElement);
  contentRow.push(hrElement);
  if (headingElement) {
    const heading = document.createElement('h1');
    heading.textContent = headingElement.textContent;
    contentRow.push(heading);
  }

  // Generate the table rows
  const cells = [
    headerRow,
    [contentRow],
  ];

  // Create the table block
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(tableBlock);
}