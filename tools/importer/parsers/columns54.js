/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Helper function to extract content from column rows
  const extractContentForColumn = (column) => {
    const rows = column.querySelectorAll('.row');
    return Array.from(rows).map(row => {
      const image = row.querySelector('img');
      const text = row.querySelector('p strong');

      const imageElement = document.createElement('img');
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';

      const paragraph = document.createElement('p');
      paragraph.textContent = text ? text.textContent.trim() : '';

      return [imageElement, paragraph];
    });
  };

  const leftColumn = element.querySelector('.col-md-6:nth-of-type(1)');
  const rightColumn = element.querySelector('.col-md-6:nth-of-type(2)');

  if (!leftColumn || !rightColumn) {
    console.error('Columns not found');
    return;
  }

  const leftContent = extractContentForColumn(leftColumn);
  const rightContent = extractContentForColumn(rightColumn);

  const rowData = [
    headerRow,
    ...leftContent.map((item, index) => [item, rightContent[index]])
  ];

  const block = WebImporter.DOMUtils.createTable(rowData, document);

  element.replaceWith(block);
}