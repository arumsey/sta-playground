/* global WebImporter */
export default function parse(element, { document }) {
  const columnsData = [];

  // Ensure the header row matches the example exactly
  const headerRow = ['Columns'];
  columnsData.push(headerRow);

  // Select all rows in the columns block
  const rows = element.querySelectorAll('.columns > div');

  rows.forEach((row) => {
    const img = row.querySelector('img');
    const description = row.querySelector('div:last-child');
    const content = [];

    // Extract image dynamically if available
    if (img) {
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt || ''; // Handle missing alt attributes gracefully
      content.push(imgElement);
    }

    // Extract and wrap description dynamically if available
    if (description) {
      const textElement = document.createElement('div');
      textElement.innerHTML = description.innerHTML.trim(); // Ensure proper HTML content
      content.push(textElement);
    }

    // Ensure each cell contains properly formatted and structured elements
    columnsData.push([content]);
  });

  // Create and replace block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(columnsData, document);
  element.replaceWith(block);
}