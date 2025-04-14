/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content
  const videoFrame = element.querySelector('iframe');
  if (!videoFrame) return; // Handle case if iframe is missing
  const videoUrl = videoFrame.src;

  const headerRow = ['Embed'];
  const contentRow = [`<${videoUrl}>`];

  // Create the table cells structure
  const cells = [
    headerRow,
    [videoUrl], // Ensure no markdown or incorrect format is used here
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}