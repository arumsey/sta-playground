/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row with block name
  rows.push(['Columns']);

  const columns = Array.from(element.querySelectorAll('.columns > div'));

  const blockColumns = columns.map((column) => {
    const image = column.querySelector('picture img');
    const imageElement = document.createElement('img');
    if (image) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || ''; // Defaulting to empty alt if missing
    }

    const text = column.querySelector('div:last-child');
    const contentElement = document.createElement('div');
    if (text) {
      contentElement.innerHTML = text.innerHTML;
    }

    // Combine content into a single cell to match example structure
    return [imageElement, contentElement];
  });

  rows.push(...blockColumns.map(c => [c]));

  // Creating the table with helper function
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element with the table
  element.replaceWith(table);
}