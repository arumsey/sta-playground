/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure table headers match the example precisely
  const headerRow = ['Cards (no images)'];

  // Extract the card content dynamically from the element
  const cards = Array.from(
    element.querySelectorAll('.ct07__side-nav .ct07__nav-item a')
  ).map((link) => {
    const cardTitle = link.textContent.trim();

    // Create a container for each card
    const cardContent = document.createElement('div');
    const titleElement = document.createElement('h3');
    titleElement.textContent = cardTitle;
    cardContent.appendChild(titleElement);

    return [cardContent];
  });

  // Handle edge cases: If there are no cards, append a placeholder
  const tableData = cards.length > 0 ? [headerRow, ...cards] : [headerRow, ['No content available']];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the new table
  element.replaceWith(table);
}