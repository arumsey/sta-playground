/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Header row matches example structure

  const links = element.querySelectorAll('.icon-and-text__link');

  const contentCells = Array.from(links).map((link) => {
    const img = link.querySelector('img');
    const src = img ? img.src : ''; // Dynamically extract image source
    const text = link.querySelector('.icon-and-text__text');
    const textContent = text ? text.textContent.trim() : ''; // Gracefully handle missing text

    const imageElement = document.createElement('img');
    imageElement.src = src; // Assign extracted image source to new image element

    return [imageElement, textContent]; // Return array with image and text
  });

  // Create table cells dynamically based on content
  const cells = [
    headerRow, // Add header row as first array element
    ...contentCells.map(([image, text]) => [image, text]) // Map content rows to table cells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document); // Create the table

  element.replaceWith(table); // Replace original element with new table
}