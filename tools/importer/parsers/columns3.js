/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract data dynamically from the element
  const title = element.querySelector('h2');
  const image = element.querySelector('picture img');
  const paragraphs = Array.from(element.querySelectorAll('p'));
  const links = Array.from(element.querySelectorAll('ul li a'));

  // Handle possible missing or empty elements
  const titleClone = title ? title.cloneNode(true) : document.createTextNode('');
  const imageClone = image ? image.cloneNode(true) : document.createTextNode('');

  const paragraphClones = paragraphs.length > 0 
    ? paragraphs.map(p => p.cloneNode(true)) 
    : [document.createTextNode('')];

  const linkClones = links.length > 0 
    ? links.map(link => link.cloneNode(true))
    : [document.createTextNode('')];

  // Create structured table rows
  const secondRow = [
    document.createElement('div'), // Left cell content accumulator
    document.createElement('div') // Right cell content accumulator
  ];

  // Add title and text to the left cell
  secondRow[0].append(titleClone, ...paragraphClones);

  // Add image and links to the right cell
  secondRow[1].append(imageClone, ...linkClones);

  // Create the table
  const cells = [
    headerRow,
    secondRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}