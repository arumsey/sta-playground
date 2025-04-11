/* global WebImporter */
export default function parse(element, { document }) {
  // Initialize cells array for the table
  const cells = [];

  // Add the block name in the header row
  const blockHeader = ['Cards'];
  cells.push(blockHeader);

  // Select all card-like structures
  const cardTitles = element.querySelectorAll('h3');

  // Iterate over card titles to dynamically extract associated image and description
  cardTitles.forEach((cardTitle) => {
    const imageElement = cardTitle.previousElementSibling.querySelector('img');
    const descriptionElement = cardTitle.nextElementSibling;

    // Validate and handle edge cases
    if (imageElement && (descriptionElement || cardTitle.textContent.trim())) {
      const clonedImageElement = imageElement.cloneNode(true);

      // Create title and description elements dynamically
      const title = document.createElement('h3');
      title.textContent = cardTitle.textContent.trim();
      const description = document.createElement('p');
      description.textContent = descriptionElement ? descriptionElement.textContent.trim() : '';

      // Ensure proper structure is pushed into table
      cells.push([clonedImageElement, [title, description]]);
    }
  });

  // Create the table block dynamically using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}