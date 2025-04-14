/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting and processing content dynamically
  const columns = Array.from(element.querySelectorAll('.col-xs-12'));

  // Prepare table header row dynamically based on example
  const headerRow = ['Columns'];

  // Building rows dynamically from extracted content
  const rows = columns.map((col) => {
    const image = col.querySelector('img');
    const title = col.querySelector('h4');

    // Handling cases where image or title might be missing
    const imageElement = image && document.createElement('img');
    if (imageElement) {
      imageElement.src = image.src;
      imageElement.alt = image.alt || '';
    }

    const titleText = title ? title.textContent.trim() : '';

    return [imageElement, titleText];
  });

  // Ensure all rows have consistent column count
  const tableData = [headerRow, ...rows];

  // Creating table block dynamically
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing original element with the new block table
  element.replaceWith(blockTable);
}