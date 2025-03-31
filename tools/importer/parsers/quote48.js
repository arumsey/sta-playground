/* global WebImporter */
export default function parse(element, { document }) {
  // Validate input element and handle edge cases
  if (!element || !document) return;

  // Safely extract the quote text from the pullquote element
  const pullquote = element.querySelector('.nuv-article-pullquote .nuv-article-pullquote__copy');
  const quoteText = pullquote ? pullquote.textContent.trim() : '';

  // Define header row exactly matching the example
  const headerRow = ['Quote'];

  // Define the content row with dynamically extracted quote text
  const contentRow = quoteText ? [quoteText] : [''];

  // Define the attribution row with optional placeholder content
  const attributionRow = ['Attribution, Source'];

  // Ensure valid table creation
  const tableData = [
    headerRow,
    contentRow,
    attributionRow,
  ];

  try {
    // Build the table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new structured block table
    element.replaceWith(blockTable);
  } catch (error) {
    console.error('Error creating block table:', error);
  }
}
