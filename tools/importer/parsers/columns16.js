/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting content dynamically from the provided element
  const header = element.querySelector('h2');
  const paragraph = element.querySelector('p');

  // Handle missing header or paragraph cases
  const headerContent = header ? header.cloneNode(true) : document.createElement('h2');
  const paragraphContent = paragraph ? paragraph.cloneNode(true) : document.createElement('p');

  // Extracting the image dynamically from the <picture> element
  const imgElement = element.querySelector('picture img');
  const imgContent = imgElement ? imgElement.cloneNode(true) : document.createElement('img');

  // Create table structure dynamically
  const headerRow = ['Columns'];
  const contentRow = [[headerContent, paragraphContent], imgContent];

  const cells = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the original element with the newly created block table
  element.replaceWith(block);
}