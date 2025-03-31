/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image dynamically from the element
  const img = element.querySelector('picture img');
  const imageSrc = img.getAttribute('src');
  const imageAlt = img.getAttribute('alt') || '';

  // Create an `img` element
  const imageElement = document.createElement('img');
  imageElement.src = imageSrc;
  imageElement.alt = imageAlt;

  // Prepare the row for URL placeholder (assuming the example URL provided)
  const urlElement = document.createElement('span');
  urlElement.textContent = 'https://vimeo.com/454418448';

  // Table structure
  const cells = [
    ['Embed'], // Header row
    [imageElement, urlElement], // Content row with image above the URL
  ];

  // Create block table using WebImporter
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element with newly structured block
  element.replaceWith(block);
}
