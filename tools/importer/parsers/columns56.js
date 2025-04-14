/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to extract content from a column
  const extractColumnContentAsRows = (columnElement) => {
    const rows = [];

    // Extract image
    const img = columnElement.querySelector('img');
    if (img) {
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      imgElement.style.width = img.style.width;
      imgElement.style.height = img.style.height;
      rows.push([imgElement]);
    }

    // Extract heading
    const heading = columnElement.querySelector('h3');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      rows.push([headingElement]);
    }

    // Extract paragraphs
    const paragraphs = columnElement.querySelectorAll('p');
    paragraphs.forEach((p) => {
      if (p.textContent.trim() !== '') { // Skip empty paragraphs
        const pElement = document.createElement('p');
        pElement.innerHTML = p.innerHTML;
        rows.push([pElement]);
      }
    });

    // Extract list
    const list = columnElement.querySelector('ol, ul');
    if (list) {
      const listElement = document.createElement(list.tagName);
      listElement.innerHTML = list.innerHTML;
      rows.push([listElement]);
    }

    return rows;
  };

  // Table footer matching the example
  const headerRow = ['Columns'];

  // Extract content for each column and separate into rows
  const columnElements = element.querySelectorAll('.col-xs-12.col-sm-4');
  const columnsContent = Array.from(columnElements).map((col) => extractColumnContentAsRows(col));

  // Create table rows dynamically ensuring balanced layout
  const tableRows = [headerRow, ...columnsContent.flat()];

  // Generate the structured block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new structure
  element.replaceWith(blockTable);
}