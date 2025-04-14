/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Hero'];

  // Extracting the title from the provided element dynamically
  const title = element.querySelector('h2:not(.teasers__heading)')?.textContent.trim();

  // Extracting the paragraph content dynamically
  const paragraph = element.querySelector('p')?.cloneNode(true);

  // Extracting the call-to-action link dynamically
  const linkContainer = element.querySelector('.cta-btn')?.cloneNode(true);

  // Create the table structure with extracted elements
  const cells = [
    headerRow,
    [
      [
        title ? document.createElement('h1').appendChild(document.createTextNode(title)) : '',
        paragraph || '',
        linkContainer || ''
      ]
    ]
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}