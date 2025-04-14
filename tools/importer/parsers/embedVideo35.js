/* global WebImporter */
export default function parse(element, { document }) {
  // Safety check: ensure the element contains an iframe and description
  const iframe = element.querySelector('iframe');
  const embedDescription = element.querySelector('em');

  // Handling edge cases: check if iframe or embed description is missing
  if (!iframe) {
    console.error('No iframe found in the element. Cannot create embed block.');
    return;
  }
  if (!embedDescription) {
    console.warn('No description found. Embed block will only include the iframe.');
  }

  // Header row matches example exactly
  const headerRow = ['Embed'];

  // Create content row dynamically
  // Embed description might be missing, so handle appropriately
  const contentRow = [
    [iframe, embedDescription ? document.createElement('br') : '', embedDescription || '']
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  // Use helper to create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}