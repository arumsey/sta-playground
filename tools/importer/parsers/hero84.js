/* global WebImporter */
export default function parse(element, { document }) {
  // Extract title
  const titleElement = element.querySelector('h2:not([style="display:none;"])');
  const title = titleElement ? document.createElement('h2').appendChild(titleElement.cloneNode(true)) : null;

  // Extract subtitle
  const subtitleElement = element.querySelector('p');
  const subtitle = subtitleElement ? document.createElement('div').appendChild(subtitleElement.cloneNode(true)) : null;

  // Extract call-to-action button
  const ctaElement = element.querySelector('.cta-btn');
  const cta = ctaElement ? document.createElement('div').appendChild(ctaElement.cloneNode(true)) : null;

  // Create the header row for the table (exactly matching example structure)
  const headerRow = ['Hero'];

  // Combine extracted elements into rows, checking for null elements
  const contentRow = [
    [title, subtitle, cta].filter(Boolean) // Filter out null elements
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(blockTable);
}