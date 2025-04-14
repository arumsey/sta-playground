/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Get the column elements dynamically
  const columns = element.querySelectorAll('div[class*="col-"]');

  // Process content for each column
  const columnCells = Array.from(columns).map(column => {
    const img = column.querySelector('img');
    const title = column.querySelector('h3');
    const description = column.querySelector('p');

    const colContent = [];
    if (img) colContent.push(img.cloneNode(true));
    if (title) colContent.push(title.cloneNode(true));
    if (description) colContent.push(description.cloneNode(true));

    return colContent;
  });

  // Add columns content to the table
  cells.push(columnCells);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
