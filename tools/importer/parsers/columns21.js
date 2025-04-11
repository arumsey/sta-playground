/* global WebImporter */
export default function parse(element, { document }) {
  const blockName = 'Columns';

  // Extracting relevant content from the input element dynamically
  const columns = [...element.querySelectorAll('.columns > div')];

  if (columns.length === 0) {
    console.warn('No columns found within the element.');
    return;
  }

  const rows = columns.map((column) => {
    const img = column.querySelector('img');

    if (!img) {
      console.warn('Image not found in column', column);
    }

    const contentWrapper = document.createElement('div');
    const content = column.querySelector('div:nth-of-type(2)');
    if (content) {
      contentWrapper.append(...content.childNodes);
    } else {
      console.warn('Content not found in column', column);
    }

    return [img || '', contentWrapper];
  });

  if (rows.length === 0) {
    console.error('No valid rows extracted from the columns.');
    return;
  }

  const cells = [
    [blockName],
    ...rows,
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
