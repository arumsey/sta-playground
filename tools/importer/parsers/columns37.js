/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row for the block table
  const headerRow = ['Columns'];

  // Extract stats cards and build their respective cell content
  const statsCards = Array.from(element.querySelectorAll('.nuv-stats-card'));

  const contentRow = statsCards.map((card) => {
    const valueElement = card.querySelector('.nuv-stats-card__value');
    const captionElement = card.querySelector('.nuv-stats-card__caption');

    // Handle potential missing elements
    const valueText = valueElement ? valueElement.textContent.trim() : '';
    const captionText = captionElement ? captionElement.textContent.trim() : '';

    // Create elements for table cell content
    const value = document.createElement('p');
    value.textContent = valueText;

    const caption = document.createElement('p');
    caption.textContent = captionText;

    // Combine value and caption into a container element
    const container = document.createElement('div');
    container.appendChild(value);
    container.appendChild(caption);

    return container;
  });

  // Create the table with properly split columns
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the constructed block table
  element.replaceWith(blockTable);
}
