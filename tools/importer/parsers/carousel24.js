/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row with proper formatting
  rows.push(['Carousel']);

  // Select the logos from the element
  const logoElements = element.querySelectorAll('.logos.block > div');

  logoElements.forEach((logoElem) => {
    const image = logoElem.querySelector('img');

    // Check if image exists; add dynamic content if found
    if (image) {
      const imgElem = document.createElement('img');
      imgElem.src = image.src;
      imgElem.alt = image.alt;
      rows.push([imgElem]); // Add image to new table row
    }
  });

  // Generate block table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with constructed table
  element.replaceWith(table);
}