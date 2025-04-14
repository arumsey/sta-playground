/* global WebImporter */
export default function parse(element, { document }) {
  try {
    // Verify input element
    if (!element || !document) {
      throw new Error('Invalid input: element or document is null/undefined');
    }

    // Extract the links from the given element dynamically
    const links = Array.from(element.querySelectorAll('a')).map(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href.trim(); // Ensure no trailing spaces
      anchor.textContent = link.textContent.trim(); // Strip unwanted spaces
      return anchor;
    });

    // Handle edge case: No links found
    if (links.length === 0) {
      throw new Error('No links found in the provided element.');
    }

    // Organize the content into rows for the block table
    const headerRow = ['Columns']; // Matches example header exactly
    const contentRow = [links];

    const cells = [
      headerRow,  // Header row (single column based on example)
      contentRow // Content row with dynamically populated links
    ];

    // Create the block table dynamically
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(table);

  } catch (error) {
    console.error('Error in parse function:', error.message);
  }
}