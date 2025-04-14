/* global WebImporter */
export default function parse(element, { document }) {
  // Create a header row based on the example prompt
  const headerRow = ['Columns'];

  // Extract data from `element`, specifically the list items with proper edge case handling
  const listItems = Array.from(element.querySelectorAll('li')).map((listItem) => {
    const link = listItem.querySelector('a');

    // Handle edge case: Ensure we skip if link does not exist
    if (!link) {
      return document.createTextNode('');
    }

    const linkText = link.textContent.trim();
    const linkHref = link.getAttribute('href');

    // Create a new anchor element with the extracted text and href dynamically
    const anchor = document.createElement('a');
    anchor.textContent = linkText;

    // Handle edge case: href might be empty
    if (linkHref) {
      anchor.href = linkHref;
    }

    return anchor;
  });

  // Ensure we handle the case where listItems array might be empty
  const cells = [
    headerRow, // Header row based on markdown example
    listItems.length > 0 ? listItems : [document.createTextNode('')], // Data row containing links extracted from list items
  ];

  // Generate the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}