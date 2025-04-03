/* global WebImporter */

export default function parse(element, { document }) {
  // Helper to create content for the text cell of a card
  const createTextContent = (heading, description, cta) => {
    const textElements = [];

    if (heading) {
      const titleElement = document.createElement('h3');
      titleElement.textContent = heading;
      textElements.push(titleElement);
    }

    if (description) {
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = description;
      textElements.push(descriptionElement);
    }

    if (cta) {
      const ctaElement = document.createElement('a');
      ctaElement.textContent = cta.text;
      ctaElement.href = cta.href;
      textElements.push(ctaElement);
    }

    return textElements;
  };

  // Extracting the elements representing the cards
  const cardElements = element.querySelectorAll('.src__GridMarginOffset-eNWsTM.gSpuda .grid-item__Item-dCtxOM');
  const cells = [
    ['**Cards**'] // Corrected Header row
  ];

  cardElements.forEach(card => {
    const imageElement = card.querySelector('img');
    const headingElement = card.querySelector('h3');
    const descriptionElement = card.querySelector('p');

    const imageCellContent = imageElement ? imageElement.cloneNode(true) : 'No Image Available'; // Handle missing image
    const textCellContent = createTextContent(
      headingElement ? headingElement.textContent : null,
      descriptionElement ? descriptionElement.textContent : null,
      null // Placeholder for call-to-action if added later
    );
    cells.push([imageCellContent, textCellContent]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table-based block
  element.replaceWith(block);

  return block;
}