/* global WebImporter */
export default function parse(element, { document }) {
  // Check and extract the image, headline, text, and CTA dynamically
  const image = element.querySelector('img');
  const heading = element.querySelector('h2');
  const paragraph = element.querySelector('p');
  const cta = element.querySelector('a.cta-btn');

  // Edge case checks to handle missing elements
  const extractedImage = image ? image : document.createElement('span'); // Fallback for missing image
  const extractedHeading = heading ? heading : document.createElement('span'); // Fallback for missing heading
  const extractedParagraph = paragraph ? paragraph : document.createElement('span'); // Fallback for missing text
  const extractedCTA = cta ? cta : document.createElement('span'); // Fallback for missing CTA

  // Combine all content dynamically into a single cell
  const combinedContent = document.createElement('div');
  combinedContent.appendChild(extractedImage);
  combinedContent.appendChild(document.createElement('br'));
  combinedContent.appendChild(extractedHeading);
  combinedContent.appendChild(document.createElement('br'));
  combinedContent.appendChild(extractedParagraph);
  combinedContent.appendChild(document.createElement('br'));
  combinedContent.appendChild(extractedCTA);

  // Ensure the table contains the correct header row and content structure
  const rows = [
    ['Hero'], // Header row with exact block name, ensuring one column
    [combinedContent] // Single-cell content row combining all elements dynamically
  ];

  // Create the block table using provided utility function
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}