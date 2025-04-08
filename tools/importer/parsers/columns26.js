/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row: Correctly extracting and structuring header as "Columns"
  cells.push(['Columns']);

  // Extracting content from HTML dynamically
  const columns = Array.from(element.querySelectorAll('.columns > div'));

  if (columns.length) {
    const row = columns.map((column) => {
      const content = [];

      // Add image if present
      const img = column.querySelector('picture img');
      if (img) {
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        imgElement.width = img.width;
        imgElement.height = img.height;
        content.push(imgElement);
      }

      // Add text content dynamically and ensure proper handling of edge cases
      const textContent = column.querySelector('div:nth-of-type(2)');
      if (textContent && textContent.textContent.trim().length > 0) {
        content.push(textContent.cloneNode(true));
      }

      return content;
    });

    cells.push(row);
  } else {
    // Edge case: when no columns are found, an empty row is added
    cells.push(['No content available']);
  }

  // Creating the table dynamically
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with the newly created table
  element.replaceWith(table);
}