/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a single card entry dynamically
  function createCardRow(cardElement) {
    // Extract image source and alt text
    const imageElement = cardElement.querySelector('img');
    const imageSrc = imageElement ? imageElement.src : '';
    const imageAlt = imageElement ? imageElement.alt : '';

    // Extract title (strong text)
    const titleElement = cardElement.querySelector('h2, h4');
    const titleText = titleElement ? titleElement.textContent.trim() : '';

    // Extract description (paragraph or other text content)
    const descriptionElement = cardElement.querySelector('p');
    const descriptionText = descriptionElement ? descriptionElement.textContent.trim() : '';

    // Create the row with image and text content
    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = imageAlt;

    const textContent = [];
    if (titleText) {
      const title = document.createElement('strong');
      title.textContent = titleText;
      textContent.push(title);
    }
    if (descriptionText) {
      const description = document.createElement('p');
      description.textContent = descriptionText;
      textContent.push(description);
    }

    return [image, textContent];
  }

  // Extract all card elements dynamically from the HTML structure
  const cardElements = Array.from(element.querySelectorAll('.grid-item__Item-dCtxOM'));
  const cards = cardElements.map(cardElement => createCardRow(cardElement));

  // Create header row for the Cards block
  const headerRow = ['Cards'];

  // Combine header row and card rows into the table data
  const tableData = [headerRow, ...cards];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}