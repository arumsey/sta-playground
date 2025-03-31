/* global WebImporter */
export default function parse(element, { document }) {
  // Header row to indicate block type
  const headerRow = ['Columns'];

  // Extract content dynamically from the input element
  const paragraphs = Array.from(element.querySelectorAll('p')).map((p) => p.cloneNode(true));
  const images = Array.from(element.querySelectorAll('img')).map((img) => {
    const imgClone = document.createElement('img');
    imgClone.src = img.src;
    imgClone.alt = img.alt;
    return imgClone;
  });

  // Ensure edge cases are handled correctly
  const rows = [];

  if (paragraphs.length > 0 && images.length > 0) {
    rows.push([paragraphs[0], images[0]]); // Combine the first paragraph with the first image
  }

  if (images.length > 1 && paragraphs.length > 1) {
    rows.push([images[1], paragraphs[1]]); // Combine the second image with the second paragraph
  }

  // Create the table block using WebImporter.DOMUtils.createTable
  const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new table block
  element.replaceWith(blockTable);
}
