/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Extract block name
  const headerRow = ['Hero']; // Using example header directly
  cells.push(headerRow);

  // Extract content
  const contentRow = [];

  // Container for image and heading in one cell
  const cellContent = [];

  // Extract image if available
  const pictureElement = element.querySelector('picture img');
  if (pictureElement) {
    const image = document.createElement('img');
    image.src = pictureElement.src;
    image.alt = pictureElement.alt || '';
    cellContent.push(image);
  }

  // Extract title/heading
  const headingElement = element.querySelector('h1');
  if (headingElement) {
    const title = document.createElement('h1');
    title.textContent = headingElement.textContent;
    cellContent.push(title);
  } else {
    // Handle case where no heading is found
    const placeholderHeading = document.createElement('h1');
    placeholderHeading.textContent = 'Default Heading';
    cellContent.push(placeholderHeading);
  }

  // Ensure fallback for missing content
  if (cellContent.length === 0) {
    const defaultContent = document.createElement('p');
    defaultContent.textContent = 'No content available';
    cellContent.push(defaultContent);
  }

  // Add all combined content into a single cell
  contentRow.push(cellContent);

  cells.push(contentRow);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(table);
}