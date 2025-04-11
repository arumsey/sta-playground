/* global WebImporter */
export default function parse(element, { document }) {
  // Extract Block Name Dynamically
  const headerRow = ['Embed'];

  // Extract URL, assuming the URL might be embedded within the HTML structure
  const urlElement = element.querySelector(".embed-wrapper .embed a");
  const videoURL = urlElement ? urlElement.href : 'https://example.com'; // Default URL if missing

  // Extract Poster Image (if available)
  const imageElement = element.querySelector(".embed-wrapper .embed img");
  const image = imageElement ? imageElement.cloneNode(true) : null; // Clone image for safety

  // Handle Edge Cases for Missing Data
  const contentRow = []; // Initialize content row
  
  if (image) {
    contentRow.push(image);
  }
  contentRow.push(document.createTextNode(videoURL));

  // Prepare Table Data
  const tableData = [headerRow, contentRow];

  // Create WebImporter Table
  const embedTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace Original Element with the Embed Table
  element.replaceWith(embedTable);
}