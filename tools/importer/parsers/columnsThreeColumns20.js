/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the section title
  const sectionTitle = element.querySelector('h2')?.textContent.trim();

  // Collect description paragraphs
  const descriptionParagraphs = Array.from(element.querySelectorAll('p')).map(p => p.cloneNode(true));

  // Extract card content
  const cards = Array.from(element.querySelectorAll('.cards li')).map(card => {
    const imageElement = card.querySelector('img')?.cloneNode(true);
    const cardTitle = card.querySelector('.cards-card-body a')?.textContent.trim();
    const linkElement = card.querySelector('.callout-overlay a')?.cloneNode(true);

    return {
      imageElement,
      cardTitle,
      linkElement,
    };
  });

  // Prepare the table structure
  const headerRow = ['Columns']; // Header row with exact text from the example

  const cardCells = cards.map(({ imageElement, cardTitle, linkElement }) => {
    const columnContent = [imageElement];

    const titleElement = document.createElement('h3');
    titleElement.textContent = cardTitle;
    columnContent.push(titleElement);

    const linkContainer = document.createElement('div');
    linkContainer.appendChild(linkElement);
    columnContent.push(linkContainer);

    return columnContent;
  });

  const cells = [
    headerRow,
    cardCells,
  ];

  // Create the table using WebImporter DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(blockTable);
}