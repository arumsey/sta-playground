/* global WebImporter */
export default function parse(element, { document }) {
  const contentCells = [];

  // Add header row
  const headerRow = ['Columns'];
  contentCells.push(headerRow);

  const columns = Array.from(element.querySelectorAll('.col-xs-12, .col-sm-6, .col-md-3'));
  const columnContents = [];

  columns.forEach((col) => {
    const content = [];

    // Handle header dynamically
    if (col.querySelector('h3')) {
      const heading = col.querySelector('h3');
      content.push(heading.cloneNode(true));
    }

    // Extract and append paragraphs
    if (col.querySelectorAll('p').length > 0) {
      col.querySelectorAll('p').forEach((p) => {
        content.push(p.cloneNode(true));
      });
    }

    // Extract lists if present
    if (col.querySelector('ul')) {
      const ul = col.querySelector('ul');
      content.push(ul.cloneNode(true));
    }

    // Handle images dynamically
    if (col.querySelector('img')) {
      const img = col.querySelector('img');
      content.push(img.cloneNode(true));
    }

    // Embed iframe if found within the column
    if (col.querySelector('iframe')) {
      const iframe = col.querySelector('iframe');
      content.push(iframe.cloneNode(true));
    }

    columnContents.push(content);
  });

  const row = columnContents.map((columnContent) => columnContent);
  contentCells.push(row);

  const blockTable = WebImporter.DOMUtils.createTable(contentCells, document);
  element.replaceWith(blockTable);
}