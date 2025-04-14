/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) {
    throw new Error('Invalid input: element or document is missing.');
  }

  // Create the table header row matching the example
  const headerRow = ['Columns'];

  // Extract content from the first column dynamically
  const firstColumnContent = [];
  const firstColumnElement = element.querySelector('.col-sm-6:nth-child(1) .teasers__teaser');
  if (firstColumnElement) {
    const paragraphs = firstColumnElement.querySelectorAll('p');
    paragraphs.forEach((p) => {
      firstColumnContent.push(p.cloneNode(true));
    });
  }

  // Extract content from the second column dynamically
  const secondColumnElement = element.querySelector('.col-sm-6:nth-child(2) .teasers__teaser');
  const secondColumnContent = [];
  if (secondColumnElement) {
    const iframe = secondColumnElement.querySelector('iframe');
    if (iframe) {
      secondColumnContent.push(iframe.cloneNode(true));
    }
  }

  // Ensure both columns are handled gracefully, even if empty
  const rows = [
    headerRow,
    [
      firstColumnContent.length > 0 ? firstColumnContent : '',
      secondColumnContent.length > 0 ? secondColumnContent : ''
    ]
  ];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}