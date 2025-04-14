/* global WebImporter */
 export default function parse(element, { document }) {
  // Define the header of the block table, ensure alignment with example
  const headerRow = ['Columns'];

  // Verify content extraction dynamically
  const tabs = [];
  element.querySelectorAll('li').forEach((li) => {
    const anchor = li.querySelector('a');
    if (anchor) {
      const tabContent = document.createElement('span');
      tabContent.textContent = anchor.textContent.trim();
      tabs.push([tabContent]);
    } else {
      tabs.push(['']); // Handle edge case of missing anchor
    }
  });

  // Construct table rows dynamically
  const cells = [
    headerRow, // Header row as per example structure
    ...tabs,   // Populate rows with extracted content
  ];

  // Create the block table with WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structure
  element.replaceWith(blockTable);
}