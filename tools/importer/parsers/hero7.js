/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  const titleElement = element.querySelector('h1');
  const title = titleElement ? document.createElement('h1') : '';
  if (titleElement) {
    title.innerHTML = titleElement.innerHTML;
  }

  const imageElement = element.querySelector('img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Combine image and title into a single cell
  const combinedContent = document.createElement('div');
  if (image) combinedContent.appendChild(image);
  if (title) combinedContent.appendChild(title);

  const cells = [
    headerRow,
    [combinedContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}