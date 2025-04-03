/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [];

  // Header row (must match "Cards" exactly)
  const headerRow = ['Cards'];
  cells.push(headerRow);

  // Process each card dynamically
  const cardElements = element.querySelectorAll('.ct01__column');

  cardElements.forEach((cardElement) => {
    // Extract image dynamically
    const imgElem = cardElement.querySelector('.t03__image img');
    const imgSrc = imgElem ? imgElem.getAttribute('data-src') : '';
    const imgAlt = imgElem ? imgElem.getAttribute('alt') : '';
    const img = document.createElement('img');
    if (imgSrc) img.setAttribute('src', imgSrc);
    if (imgAlt) img.setAttribute('alt', imgAlt);

    // Extract text content dynamically
    const titleElem = cardElement.querySelector('.t03__label p');
    const title = titleElem ? titleElem.textContent.trim() : '';
    const descriptionElem = cardElement.querySelector('.t03__body-content div');
    const description = descriptionElem ? descriptionElem.textContent.trim() : '';

    // Combine all text content into plain text formatting
    const textContent = document.createElement('div');
    textContent.textContent = `${title}\n${description}`;

    // Add row to table cells
    cells.push([img, textContent]);
  });

  // Create and replace element with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}