/* global WebImporter */

export default function parse(element, { document }) {
  // Extract relevant cards information dynamically
  const cards = Array.from(element.querySelectorAll('li'));

  // Define the header row matching the example structure (required for block type identification)
  const headerRow = ['Columns'];

  const contentRow = cards.map(card => {
    // Extracting image, heading, and description dynamically
    const image = card.querySelector('.cards-card-image img');
    const heading = card.querySelector('.cards-card-body h3 a')?.textContent || '';
    const description = card.querySelector('.cards-card-body p')?.textContent || '';

    let imageElement = null;
    if (image) {
      imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    const columnHeader = document.createElement('h3');
    columnHeader.textContent = heading;

    const columnDescription = document.createElement('p');
    columnDescription.textContent = description;

    // Combine extracted elements into the cell
    return [imageElement, columnHeader, columnDescription];
  });

  const cells = [
    headerRow,
    contentRow,
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created structured block
  element.replaceWith(blockTable);
}