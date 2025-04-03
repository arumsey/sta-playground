/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example EXACTLY
  const headerRow = ['Columns'];

  // Extracting the content into respective columns
  const columns = Array.from(element.querySelectorAll('.src__Column-kRPWVl')).map((column) => {
    const header = column.querySelector('h2')?.textContent.trim() || '';

    // Extracting links
    const links = Array.from(column.querySelectorAll('a')).map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      return anchor;
    });

    // Combining header with links
    const headerElement = document.createElement('h2');
    headerElement.textContent = header;
    return [headerElement, ...links];
  });

  // Creating the table structure
  const cells = [
    headerRow,
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element with the new block table
  element.replaceWith(block);
}