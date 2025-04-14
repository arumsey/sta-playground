/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the video iframe
  const iframe = element.querySelector('iframe');
  const videoURL = iframe ? iframe.src : '';
  
  // If no iframe or URL is found, return without replacing
  if (!videoURL) return;

  // Construct table data according to requirements
  const tableData = [
    ['Embed'],
    [
      document.createTextNode(videoURL)
    ]
  ];

  // Create the new structured table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}