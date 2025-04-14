/* global WebImporter */

export default function parse(element, { document }) {
  // Extract the left and right columns
  const leftColumn = element.querySelector('.col-xs-12.col-sm-6:nth-child(1)');
  const rightColumn = element.querySelector('.col-xs-12.col-sm-6:nth-child(2)');

  if (!leftColumn || !rightColumn) {
    console.error('Expected columns are missing in the provided HTML input');
    return;
  }

  // Extract content from the left column
  const image = leftColumn.querySelector('img');
  const caption = leftColumn.querySelector('span');

  // Handle missing data for left column
  const leftColumnContent = [];
  if (image) {
    leftColumnContent.push(image);
  }
  if (caption) {
    leftColumnContent.push(caption);
  }

  // Extract content from the right column
  const heading = rightColumn.querySelector('h2');
  const paragraphs = Array.from(rightColumn.querySelectorAll('p'));
  const link = rightColumn.querySelector('a.cta-btn');

  // Handle missing data for right column
  const rightColumnContent = [];
  if (heading) {
    rightColumnContent.push(heading);
  }
  if (paragraphs.length) {
    rightColumnContent.push(...paragraphs);
  }
  if (link) {
    rightColumnContent.push(link);
  }

  // Create the rows for the table
  const cells = [
    ['Columns'], // Header row to match example
    [
      leftColumnContent,
      rightColumnContent,
    ],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}