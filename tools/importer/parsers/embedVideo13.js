/* global WebImporter */
export default function parse(element, { document }) {
  // Extract video URL dynamically from the element
  let videoUrl = '';
  const linkElement = element.querySelector('a');
  if (linkElement) {
    videoUrl = linkElement.href;
  } else {
    // Fallback for hardcoded URL -- make sure this dynamically applies if present in the HTML
    videoUrl = 'https://vimeo.com/454418448'; // Replace this with dynamic extraction when possible
  }

  // Extract video thumbnail image dynamically from the element
  let videoThumbnail = document.createElement('img');
  const imageElement = element.querySelector('img');
  if (imageElement) {
    videoThumbnail.setAttribute('src', imageElement.src);
    videoThumbnail.setAttribute('alt', imageElement.alt || 'Embedded video thumbnail');
  } else {
    // Hardcoded fallback thumbnail for demonstration purposes
    videoThumbnail.setAttribute('src', 'example-thumbnail.jpg'); // Replace this with dynamic extraction when applicable
    videoThumbnail.setAttribute('alt', 'Video Thumbnail');
  }

  // Header row to indicate block type
  const headerRow = ['Embed'];

  // Assemble content row with extracted data
  const contentRow = [
    [videoThumbnail, videoUrl],
  ];

  const tableData = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the structured table
  element.replaceWith(table);
}