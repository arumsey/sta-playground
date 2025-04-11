/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero'];
  cells.push(headerRow);

  // Extracting content for the second row
  const contentRow = [];

  // Merging image and headline into a single cell
  const combinedContent = document.createElement('div');

  // Extracting the image element
  const picture = element.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      combinedContent.appendChild(imageElement);
    }
  }

  // Extracting the headline text
  const headline = element.querySelector('h1');
  if (headline) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = headline.textContent;
    combinedContent.appendChild(headingElement);
  }

  contentRow.push(combinedContent);
  cells.push(contentRow);

  // Creating the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replacing the original element
  element.replaceWith(block);
}