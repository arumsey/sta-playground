/* global WebImporter */
export default function parse(element, { document }) {
    // Extract all card elements
    const cards = element.querySelectorAll('li');

    const rows = [];

    // Corrected header row
    const headerRow = ['Columns'];
    rows.push(headerRow);

    // Create content row with individual cells for each column
    const contentRow = Array.from(cards).map((card) => {
      const cardImage = card.querySelector('.cards-card-image img');
      const cardBody = card.querySelector('.cards-card-body');

      if (!cardImage || !cardBody) {
        return null;
      }

      // Extract image
      const imageElement = document.createElement('img');
      imageElement.src = cardImage.getAttribute('src');
      imageElement.alt = cardImage.getAttribute('alt');

      // Extract title and description
      const title = cardBody.querySelector('h3');
      const description = cardBody.querySelector('p');

      const titleElement = document.createElement('h3');
      titleElement.textContent = title ? title.textContent : '';
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description ? description.textContent : '';

      const cellContent = document.createElement('div');
      cellContent.append(imageElement, titleElement, descriptionElement);

      return cellContent;
    }).filter(cell => cell !== null);

    rows.push(contentRow);

    // Generate the block table
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}