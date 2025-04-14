/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Selecting the content within the HTML structure
  const columns = Array.from(element.querySelectorAll('.row.teasers__teaser > .col-xs-12'));

  // Creating cells for each column
  const cellsContent = columns.map((column) => {
    const image = column.querySelector('img');
    const heading = column.querySelector('h3');
    const paragraph = column.querySelector('p');

    const imageElement = image ? document.createElement('img') : null;
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt;
    }

    const titleElement = heading ? document.createElement('p') : null;
    if (titleElement) {
      titleElement.textContent = heading.textContent.trim();
    }

    const textElement = paragraph ? document.createElement('p') : null;
    if (textElement) {
      textElement.textContent = paragraph.textContent.trim();
    }

    return [imageElement, titleElement, textElement].filter(el => el !== null);
  });

  // Flatten the cellsContent array to ensure a single-row layout
  const finalContentRow = cellsContent.map(cellElements => cellElements);

  // Assembling the data rows
  const blockData = [headerRow, finalContentRow];
  const tableBlock = WebImporter.DOMUtils.createTable(blockData, document);

  // Replace the original element with the block
  element.replaceWith(tableBlock);
}