/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row as specified in the example
  const headerRow = ['Hero'];

  // Extract the title element
  const titleElement = element.querySelector('h2');

  // Create a heading element
  const heading = document.createElement('h1');
  heading.textContent = titleElement ? titleElement.textContent.trim() : '';

  // Extract all paragraphs
  const paragraphs = element.querySelectorAll('p');

  // Combine heading and paragraphs into a single container
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(heading);
  paragraphs.forEach((paragraph) => {
    const clonedParagraph = document.createElement('p');
    clonedParagraph.innerHTML = paragraph.innerHTML;
    combinedContent.appendChild(clonedParagraph);
  });

  // Create table rows
  const rows = [
    headerRow, // Header row with exactly one column
    [combinedContent], // Single column containing all combined content
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}