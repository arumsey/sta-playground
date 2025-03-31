/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Check if the element has a proper column structure
  const columns = [...element.children];

  if (columns.length === 0) {
    // Handle edge case where no content exists in the element
    const emptyRow = document.createElement('p');
    emptyRow.textContent = 'No content available';
    const tableCells = [
      headerRow,
      [emptyRow],
    ];

    const table = WebImporter.DOMUtils.createTable(tableCells, document);
    element.replaceWith(table);
    return;
  }

  const columnData = columns.map((column) => {
    const headerElement = column.querySelector('h2');
    const textElement = column.querySelector('p');

    const header = headerElement ? headerElement.cloneNode(true) : document.createElement('h2');
    header.textContent = headerElement ? headerElement.textContent : 'Missing Header';

    const text = textElement ? textElement.cloneNode(true) : document.createElement('p');
    text.textContent = textElement ? textElement.textContent : 'Missing Content';

    return [header, text];
  });

  const tableCells = [
    headerRow,
    columnData,
  ];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
