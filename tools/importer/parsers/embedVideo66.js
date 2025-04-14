/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the input element
  const strongElements = element.querySelectorAll('strong');

  // Edge case handling for missing 'strong' elements
  if (strongElements.length < 2) {
    console.error('Expected 2 strong elements in the HTML structure. Handling edge case by skipping processing.');
    return;
  }

  const contentLeft = strongElements[0].textContent.trim();
  const contentRight = strongElements[1].textContent.trim();

  // Create table structure
  const cells = [
    ['Embed'],
    [`${contentLeft}: ${contentRight}`],
  ];

  // Create block table using helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(block);
}