/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract card content dynamically
  const contentCells = Array.from(element.querySelectorAll('li')).map((card) => {
    const imageContainer = card.querySelector('picture img');
    const cardBody = card.querySelector('.cards-card-body');
    const titleAnchor = cardBody.querySelector('h3 a');
    const description = cardBody.querySelector('p');

    // Handle missing elements
    const image = imageContainer ? document.createElement('img') : null;
    if (image) {
      image.src = imageContainer.src;
      image.alt = imageContainer.alt || '';
    }

    const title = titleAnchor ? document.createElement('h3') : null;
    if (title) {
      title.textContent = titleAnchor.textContent;
    }

    const desc = description ? document.createElement('p') : null;
    if (desc) {
      desc.textContent = description.textContent;
    }

    // Return array of extracted elements
    return [image, title, desc].filter(Boolean);
  });

  // Create table with extracted cells
  const cells = [headerRow, contentCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}