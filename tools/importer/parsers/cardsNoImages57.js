/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract content dynamically from the element
  const header = element.querySelector('h2');
  const paragraphs = element.querySelectorAll('p');

  // Validate that header and paragraphs exist
  if (!header || !paragraphs.length) return;

  // Create header row for the block table
  const headerRow = ['Cards (no images)'];

  // Step 2: Process paragraphs and associated content
  const rows = Array.from(paragraphs).map((paragraph) => {
    const textContent = document.createElement('div');
    textContent.append(paragraph.cloneNode(true));
    return [textContent];
  });

  // Combine header row with content rows
  const tableData = [headerRow, ...rows];

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}