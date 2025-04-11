/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row
  rows.push(['Columns']);

  // Add the content rows
  const items = element.querySelectorAll('.block.columns-2-cols > div');
  items.forEach((item) => {
    const image = item.querySelector('picture img');
    const text = item.querySelector('div:nth-of-type(2)');

    // Handle edge case for missing image or text
    let imageElement; 
    if (image) {
      imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
      imageElement.width = image.width;
      imageElement.height = image.height;
    } else {
      imageElement = document.createTextNode('');
    }

    let textElement;
    if (text) {
      textElement = text.cloneNode(true);
    } else {
      textElement = document.createTextNode('');
    }

    rows.push([
      [imageElement, textElement],
    ]);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}