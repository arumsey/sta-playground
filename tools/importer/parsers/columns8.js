/* global WebImporter */
export default function parse(element, { document }) {
  // Create table header row with the exact text from the example
  const headerRow = ['Columns'];

  // Extract and organize relevant content dynamically
  const listItems = [...element.querySelectorAll('ul li')].map((li) => {
    const listItem = document.createElement('li');
    listItem.textContent = li.textContent.trim();
    return listItem;
  });

  const firstImageElement = element.querySelectorAll('img')[0];
  const firstImage = document.createElement('img');
  if (firstImageElement) {
    firstImage.src = firstImageElement.src;
    firstImage.alt = firstImageElement.alt;
  }

  const secondImageElement = element.querySelectorAll('img')[1];
  const secondImage = document.createElement('img');
  if (secondImageElement) {
    secondImage.src = secondImageElement.src;
    secondImage.alt = secondImageElement.alt;
  }

  const liveLinkElement = element.querySelector('a');
  const liveLink = document.createElement('div');
  if (liveLinkElement) {
    const link = document.createElement('a');
    link.href = liveLinkElement.href;
    link.textContent = liveLinkElement.textContent.trim();
    liveLink.appendChild(link);
  }

  const previewBlock = document.createElement('div');
  const previewLink = document.createElement('a');
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  previewLink.textContent = 'Preview';
  previewBlock.appendChild(previewLink);

  // Prepare cells array dynamically by breaking content appropriately into rows and columns
  const listColumn = document.createElement('ul');
  listColumn.append(...listItems);

  const cells = [
    headerRow, // Header row
    [listColumn, firstImage], // Second row: structured list items and first image in separate columns
    [secondImage, liveLink], // Third row: second image and live link grouped properly in columns
    ['Preview', previewBlock], // Fourth row: properly designed preview layout
  ];

  // Create the table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
