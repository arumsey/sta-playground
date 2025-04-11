/* global WebImporter */

export default function parse(element, { document }) {
  // Extract relevant data from the input element

  // Extract the title and paragraph
  const titleElement = element.querySelector('h2');
  const title = titleElement ? titleElement.textContent : '';
  const paragraphElement = element.querySelector('p');
  const paragraph = paragraphElement ? paragraphElement.textContent : '';

  // Extract the image
  const imageElement = element.querySelector('picture img');
  const image = imageElement ? imageElement.cloneNode(true) : '';

  // Create table rows
  const headerRow = ['Columns'];
  const contentRow = [
    document.createElement('div'),
    image
  ];

  if (title) {
    const titleDiv = document.createElement('div');
    titleDiv.textContent = title;
    contentRow[0].appendChild(titleDiv);
  }

  if (paragraph) {
    const paragraphDiv = document.createElement('div');
    paragraphDiv.textContent = paragraph;
    contentRow[0].appendChild(paragraphDiv);
  }

  // Create the block table
  const cells = [
    headerRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}