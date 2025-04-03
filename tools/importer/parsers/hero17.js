/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the content for the hero block
  const heading = element.querySelector('.b01__headline')?.textContent.trim();
  const subheading = element.querySelector('.b01__eyebrow')?.textContent.trim();
  const image = element.querySelector('.ct01__background picture img');

  // Create an image element
  const imageElement = document.createElement('img');
  if (image) {
    imageElement.src = image.getAttribute('src');
    imageElement.alt = image.getAttribute('alt') || '';
  }

  // Prepare the heading and subheading elements
  const subheadingElement = subheading ? document.createElement('p') : null;
  if (subheadingElement) {
    subheadingElement.textContent = subheading;
  }

  const headingElement = heading ? document.createElement('h1') : null;
  if (headingElement) {
    headingElement.textContent = heading;
  }

  // Assemble the cells for the table
  const headerRow = ['Hero'];
  const contentRow = [
    [
      imageElement,
      subheadingElement,
      headingElement
    ].filter(Boolean) // Remove any null/undefined values
  ];

  // Create the table using the helper
  const block = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}