/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Columns']; // Matches example header exactly
  cells.push(headerRow);

  // Extract rows of content
  const contentRow = [...element.querySelectorAll('.btn--icon-rm')].map((btnIcon) => {
    const img = btnIcon.querySelector('img');
    const textElement = btnIcon.querySelector('.btn--icon-rm__text');

    // Handle missing elements
    if (!img || !textElement) {
      return ''; // Empty cell for missing data
    }

    // Create image element dynamically
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;
    imageElement.width = img.width;

    // Create text element dynamically
    const textDiv = document.createElement('div');
    textDiv.innerHTML = textElement.innerHTML;

    return [imageElement, textDiv]; // Content dynamically extracted
  });

  cells.push(contentRow);

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the block table
  element.replaceWith(block);
}