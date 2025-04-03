/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Columns'];

  // Extract column 1 content dynamically
  const leftColumn = element.querySelector('.ct01__column:nth-child(1)');
  if (!leftColumn) {
    throw new Error('Left column not found');
  }
  
  const headlineElement = leftColumn.querySelector('.b01__headline');
  const headline = headlineElement ? headlineElement.textContent.trim() : '';
  
  const descriptionElement = leftColumn.querySelector('.b02__rich-text');
  const description = descriptionElement ? descriptionElement.innerHTML : '';

  const leftContent = document.createElement('div');
  if (headline) {
    const headlineNode = document.createElement('h2');
    headlineNode.textContent = headline;
    leftContent.appendChild(headlineNode);
  }
  if (descriptionElement) {
    const descriptionNode = document.createElement('div');
    descriptionNode.innerHTML = description;
    leftContent.appendChild(descriptionNode);
  }

  // Extract column 2 content dynamically
  const rightColumn = element.querySelector('.ct01__column:nth-child(2)');
  if (!rightColumn) {
    throw new Error('Right column not found');
  }

  const imageElement = rightColumn.querySelector('img');
  const image = document.createElement('img');
  if (imageElement) {
    image.src = imageElement.src;
  } else {
    image.alt = 'Placeholder image';
  }

  // Define the cells array for the rows
  const cells = [
    headerRow, // Header row
    [leftContent, image], // Content row with left and right columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}