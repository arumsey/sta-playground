/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row: Matches the example exactly
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Approach: Extract individual card sections dynamically
  const cardSections = element.querySelectorAll('.default-content-wrapper > h3');

  cardSections.forEach((titleElement) => {
    const titleText = titleElement.textContent.trim();

    // Find the parent container
    const parent = titleElement.closest('.default-content-wrapper');

    // Extract the corresponding image for the card section
    const imageElement = titleElement.previousElementSibling.querySelector('img');
    let imageNode = null;
    if (imageElement) {
      imageNode = document.createElement('img');
      imageNode.src = imageElement.src;
      imageNode.alt = imageElement.alt || '';
    }

    // Extract the description paired with the title
    const descriptionElement = titleElement.nextElementSibling;
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Add the card row (image node and combined title + description)
    cells.push([
      imageNode,
      `${titleText}${descriptionText ? `\n${descriptionText}` : ''}`
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}