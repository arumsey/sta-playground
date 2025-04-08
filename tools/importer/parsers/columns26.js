/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Data rows
  const columns = element.querySelectorAll('div.list > div');

  const contentRow = Array.from(columns).map((column) => {
    // Extract image
    const imgContainer = column.querySelector('picture img');
    let imgElement = null;
    if (imgContainer) {
      imgElement = document.createElement('img');
      imgElement.src = imgContainer.src;
      imgElement.alt = imgContainer.alt;
    }

    // Extract text content
    const textContainer = column.querySelector('div:last-child');
    let textElement = null;
    if (textContainer) {
      textElement = document.createElement('div');
      textElement.innerHTML = textContainer.innerHTML.trim();
    }

    // Combine image and text for column cell
    if (imgElement && textElement) {
      return [imgElement, textElement];
    } else if (imgElement) {
      return imgElement;
    } else if (textElement) {
      return textElement;
    } else {
      return '';
    }
  });

  rows.push(contentRow);

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}