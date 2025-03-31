/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (no images)'];

  // Extract cards information from HTML
  const cards = Array.from(element.querySelectorAll('.nuv-dmat-list__item')).map((item) => {
    const cardElements = [];

    // Extract heading
    const heading = item.querySelector('.nuv-search-results__title a');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      cardElements.push(headingElement);
    }

    // Extract description
    const descriptions = item.querySelectorAll('.nuv-search-results__description a');
    descriptions.forEach((desc) => {
      const descElement = document.createElement('p');
      descElement.textContent = desc.textContent.trim();
      cardElements.push(descElement);
    });

    return [cardElements]; // Each card is its own row
  });

  const cells = [headerRow, ...cards];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
