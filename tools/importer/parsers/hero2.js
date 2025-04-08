/* global WebImporter */
export default function parse(element, { document }) {
  // Header row to match example structure
  const headerRow = ['Hero'];

  // Extract image, ensuring robust handling for missing or malformed images
  const imageElement = element.querySelector('img');
  let image = null;
  if (imageElement) {
    image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt || ''; // Handle case where alt text is missing
  }

  // Extract heading, ensuring robust handling for missing headings
  const headingElement = element.querySelector('h1');
  let heading = null;
  if (headingElement) {
    heading = document.createElement('h1');
    heading.textContent = headingElement.textContent; // Correctly set the text content instead of innerText
  }

  // Prepare table content dynamically, ensuring it matches example structure
  const contentRow = [];
  if (image) contentRow.push(image);
  if (heading) contentRow.push(heading);

  const cells = [
    headerRow, // Header row
    contentRow, // Content row with extracted elements
  ];

  // Create table using WebImporter helper and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}