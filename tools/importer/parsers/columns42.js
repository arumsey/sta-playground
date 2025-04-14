/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const columns = [];

  // Extracting column data
  element.querySelectorAll('.col-xs-12').forEach((col) => {
    const img = col.querySelector('img');
    const title = col.querySelector('h4');

    // Verify if img and title exist
    if (img && title) {
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      imgElement.style.maxWidth = img.style.maxWidth;

      const textElement = document.createElement('p');
      textElement.textContent = title.textContent.trim();

      columns.push([imgElement, textElement]);
    } else {
      columns.push([document.createTextNode('Missing data')]);
    }
  });

  const tableData = [
    headerRow,
    ...columns.map(([imgElement, textElement]) => {
      const cell = document.createElement('div');
      cell.append(imgElement);
      if (textElement) {
        cell.append(textElement);
      }
      return [cell];
    }),
  ];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}