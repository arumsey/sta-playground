/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row
  const headerRow = ['Columns'];

  // Extract cards and images from the HTML
  const cards = element.querySelectorAll('.cards-card-body');
  const images = element.querySelectorAll('.cards-card-image img');

  // Ensure dynamic content is extracted properly
  const rows = Array.from(cards).map((card, index) => {
    const image = images[index];

    // Handle edge cases: missing or empty elements
    const cardImage = document.createElement('img');
    cardImage.src = image ? image.src : '';
    cardImage.alt = image ? image.alt : '';

    const titleElement = card.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const paragraphElement = card.querySelector('p');
    const paragraph = paragraphElement ? paragraphElement.textContent.trim() : '';

    const titleBlock = document.createElement('h2');
    titleBlock.textContent = title;

    const paragraphBlock = document.createElement('p');
    paragraphBlock.textContent = paragraph;

    // Return column data for this card
    return [cardImage, titleBlock, paragraphBlock];
  });

  // Structure the rows properly with each card in its own column
  const tableData = [
    headerRow,
    rows // Each card forms a separate column, as required
  ];

  // Generate table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new table block
  element.replaceWith(block);
}