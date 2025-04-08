/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract the cards and their content
  const cards = element.querySelectorAll('.cards li');
  const row = Array.from(cards).map((card) => {
    const imgElement = card.querySelector('img');
    const image = document.createElement('img');
    image.src = imgElement ? imgElement.src : '';
    image.alt = imgElement ? imgElement.alt || '' : '';

    const titleElement = card.querySelector('strong a');
    const title = document.createElement('h2');
    title.textContent = titleElement ? titleElement.textContent.trim() : '';

    const linkElement = card.querySelector('.callout-overlay a');
    const link = document.createElement('a');
    link.href = linkElement ? linkElement.href : '';
    link.textContent = linkElement ? linkElement.textContent.trim() : '';

    return [image, title, link].filter(Boolean); // Filter out any null values
  });

  cells.push(row);

  // Create the block table and replace the element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}