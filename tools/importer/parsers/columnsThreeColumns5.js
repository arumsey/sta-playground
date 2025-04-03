/* global WebImporter */

export default function parse(element, { document }) {
  // Get the three columns
  const columns = Array.from(
    element.querySelectorAll('.ct01__column .ct01__wrapper > .b02-rich-text')
  );

  // Extract title and content from each column
  const columnData = columns.map((column) => {
    const title = column.querySelector('h5')?.textContent?.trim() || '';
    const paragraph = column.querySelector('p')?.textContent?.trim() || '';
    const content = document.createElement('div');
    const titleElement = document.createElement('h2');
    const paragraphElement = document.createElement('p');

    titleElement.textContent = title;
    content.appendChild(titleElement);

    if (paragraph) {
      paragraphElement.textContent = paragraph;
      content.appendChild(paragraphElement);
    }

    return content;
  });

  // Define header and cells for the table
  const headerRow = ['Columns'];
  const dataRow = [columnData];

  // Create the table
  const table = WebImporter.DOMUtils.createTable([headerRow, ...dataRow], document);

  // Replace the old element
  element.replaceWith(table);
}