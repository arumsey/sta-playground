/* global WebImporter */
export default function parse(element, { document }) { 
  // Extract the headline text dynamically
  const headlineElement = element.querySelector('.b01__headline');
  const headline = headlineElement ? document.createElement('h1') : null;
  if (headline) {
    headline.textContent = headlineElement.textContent.trim();
  }

  // Extract button text and link dynamically
  const buttonElement = element.querySelector('.b03__button');
  const button = buttonElement ? document.createElement('a') : null;
  if (button) {
    button.href = buttonElement.href;
    button.textContent = buttonElement.textContent.trim();
    button.className = buttonElement.className;
  }

  // Define the table structure based on provided requirements
  const headerRow = ['Hero'];
  const contentRow = [headline, button];

  // Ensure the structure and type matches example
  const cells = [
    headerRow, // Header exactly as per example
    contentRow // Single content row with dynamic data
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}