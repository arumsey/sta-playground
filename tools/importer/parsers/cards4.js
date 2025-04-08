/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];
  const rows = [];

  // Process each heading (card title)
  Array.from(element.querySelectorAll('h3')).forEach((heading) => {
    const parent = heading.parentElement;

    // Extract the image related to the card
    const image = parent.querySelector('picture img');

    // Extract the title from the heading
    const title = heading.textContent.trim();

    // Extract relevant description paragraphs below the heading
    const descriptionElement = [];
    let nextSibling = heading.nextElementSibling;
    while (nextSibling && nextSibling.tagName !== 'H3' && nextSibling.tagName !== 'H2') {
      if (nextSibling.tagName === 'P' && !nextSibling.querySelector('picture')) {
        descriptionElement.push(nextSibling.textContent.trim());
      }
      nextSibling = nextSibling.nextElementSibling;
    }

    const descriptionText = descriptionElement.join(' ');
    const descriptionNode = document.createElement('p');
    descriptionNode.textContent = descriptionText;

    const titleElement = document.createElement('strong');
    titleElement.textContent = title;

    if (image && title) {
      rows.push([
        image, // Image added dynamically into the first cell
        [titleElement, descriptionNode], // Title and description structured dynamically into the second cell
      ]);
    }
  });

  // Construct the table and replace the element
  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}