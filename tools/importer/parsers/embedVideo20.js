/* global WebImporter */
export default function parse(element, { document }) {
  // Validate if iframe exists within the element
  const iframe = element.querySelector('iframe');
  const videoUrl = iframe ? iframe.src : '';

  // Ensure dynamic content extraction from the element
  if (!videoUrl) {
    console.warn('No video URL found in the given element.');
    return; // Handle missing iframe case
  }

  // Define header row - Ensure it matches the example EXACTLY
  const headerRow = ['Embed'];

  // Create content row containing video URL dynamically
  const contentRow = [document.createTextNode(videoUrl)];

  // Build the table structure
  const tableData = [headerRow, contentRow];

  // Use WebImporter to create a structured table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace existing element with the block, ensuring proper formatting
  element.replaceWith(block);
}