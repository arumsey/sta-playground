/* global WebImporter */

export default function parse(element, { document }) {
  // Correct Header Row Format
  const headerRow = ['Embed'];

  let contentRow = [];

  const rows = [];

  // Extract iframe for the video content
  const iframe = element.querySelector('iframe');
  if (iframe) {
    const videoURL = iframe.getAttribute('src');
    if (videoURL) {
      const videoLink = document.createElement('a');
      videoLink.href = videoURL;
      videoLink.textContent = videoURL;
      contentRow.push(videoLink);
    }
  }

  // Extract image
  const image = element.querySelector('img');
  if (image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.getAttribute('src');
    imgElement.alt = image.getAttribute('alt') || 'Image';
    rows.push([imgElement]); // Place the image in its own row above the video link
  }

  // Extract description
  const description = element.querySelector('em');
  if (description) {
    const descriptionText = description.textContent.trim();
    if (descriptionText) {
      const descElement = document.createElement('p');
      descElement.textContent = descriptionText;
      contentRow.push(descElement);
    }
  }

  // Handle missing or empty rows gracefully
  if (contentRow.length > 0) {
    rows.push(contentRow);
  } else {
    rows.push(['No content available']);
  }

  // Ensure the table structure meets all requirements
  const tableData = [headerRow, ...rows];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block
  element.replaceWith(block);
}