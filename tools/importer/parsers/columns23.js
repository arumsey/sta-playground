/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row for the Columns block
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Create content columns
  const leftColumn = document.createElement('div');
  const rightColumn = document.createElement('div');

  // Extract title dynamically with fallback for missing content
  const titleElement = element.querySelector('h2');
  const title = document.createElement('p');
  title.textContent = titleElement ? titleElement.textContent.trim() : 'Title not available';
  leftColumn.append(title);

  // Extract list items dynamically and ensure proper element nesting
  const listElement = element.querySelector('ul');
  if (listElement) {
    const listContainer = document.createElement('div');
    const list = document.createElement('ul');

    Array.from(listElement.querySelectorAll('li')).forEach((li) => {
      const link = li.querySelector('a');
      if (link) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        listItem.appendChild(anchor);
        list.appendChild(listItem);
      }
    });

    listContainer.appendChild(list);
    leftColumn.appendChild(listContainer);
  }

  // Extract image dynamically with fallback for missing attributes
  const imageElement = element.querySelector('img');
  if (imageElement) {
    const img = document.createElement('img');
    img.src = imageElement.getAttribute('src') || '';
    img.alt = imageElement.getAttribute('alt') ? imageElement.getAttribute('alt').trim() : 'Image not available';
    rightColumn.appendChild(img);
  }

  // Insert the completed columns
  cells.push([leftColumn, rightColumn]);

  // Create the block table
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Properly replace the original element
  element.replaceWith(tableBlock);
}