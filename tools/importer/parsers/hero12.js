/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the background image
  const img = element.querySelector('.c01__background img');
  const imgSrc = img ? img.getAttribute('src') || img.getAttribute('data-src') : '';
  const imageElement = imgSrc ? document.createElement('img') : null;
  if (imageElement) {
    imageElement.setAttribute('src', imgSrc);
  }

  // Extract the title
  const headline = element.querySelector('h1.c01__headline');
  const headingText = headline ? headline.textContent.trim() : '';
  const headingElement = headingText ? document.createElement('h1') : null;
  if (headingElement) {
    headingElement.textContent = headingText;
  }

  // Construct the block table array
  const cells = [
    ['Hero'], // Header row
    [
      [
        imageElement, // Background image
        headingElement // Title
      ].filter(Boolean), // Remove null entries
    ],
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}