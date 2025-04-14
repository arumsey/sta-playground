/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract necessary content dynamically from the input element
  const chart = element.querySelector('.fusioncharts-container svg'); // Extracts the SVG chart
  const axisNameElement = element.querySelector('.cal-grouped-column-chart__x-axis-name');
  const axisName = axisNameElement ? axisNameElement.textContent.trim() : 'Missing Chart Axis Name';

  // Step 2: Create a header row
  // This matches the example "Embed" header
  const headerRow = ['Embed'];

  // Step 3: Create the content row
  // Generate a placeholder image based on the chart (if dynamically extractable, replace src appropriately)
  const image = document.createElement('img');
  image.src = 'example-image-url'; // Placeholder image if dynamic extraction unavailable
  image.alt = 'Chart representation';

  // Generate the link using the axis name and a placeholder URL (if dynamically extractable, replace href appropriately)
  const link = document.createElement('a');
  link.href = 'https://example-chart-link.com'; // Placeholder URL if dynamic extraction unavailable
  link.textContent = axisName;

  const contentRow = [[image, link]];

  // Step 4: Create the block table
  const cells = [
    headerRow,
    contentRow,
  ];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Step 5: Replace the original element with the new block table
  element.replaceWith(blockTable);
}