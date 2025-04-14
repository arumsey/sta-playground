/* global WebImporter */
export default function parse(element, { document }) {
  // Extracted accordion block header
  const headerRow = ['Accordion'];

  // Extracting accordion title and content pairs
  const rows = Array.from(element.querySelectorAll('h6')).map((titleElement) => {
    const title = titleElement.textContent.trim();
    const contentElement = titleElement.nextElementSibling;
    const content = contentElement ? contentElement.innerHTML.trim() : '';

    return [title, content];
  });

  // Building the table data structure
  const tableData = [headerRow, ...rows];

  // Creating the block table
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing the element with the block table
  element.replaceWith(tableBlock);
}