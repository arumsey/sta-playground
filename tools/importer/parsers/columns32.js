/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Create the header row as per example
  rows.push(['Columns']);

  // Extracting each link and the corresponding Subscribe button, ensuring they are in separate rows
  const items = element.querySelectorAll('li.nuv-homepage-literature__links-item');

  items.forEach((item) => {
    const link = item.querySelector('a[href]');
    const button = item.querySelector('.nuv-button__btn');

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      rows.push([linkElement]);
    }

    if (button) {
      const buttonElement = document.createElement('button');
      buttonElement.textContent = button.textContent.trim();
      rows.push([buttonElement]);
    }
  });

  // Create table using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the blockTable
  element.replaceWith(blockTable);
}
