/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [];

  // Add header row indicating block type
  const headerRow = ["Columns"];
  rows.push(headerRow);

  // Extract content for the first column
  const textContent = element.querySelector('.col-sm-8 .teasers__teaser');
  const firstParagraph = document.createElement('p');
  firstParagraph.textContent = textContent ? textContent.textContent.trim() : '';

  // Extract content for the second column
  const imageContainer = element.querySelector('.col-sm-4 .teasers__teaser');
  const images = imageContainer
    ? Array.from(imageContainer.querySelectorAll('img')).map((img) => {
        const newImage = document.createElement('img');
        newImage.src = img.src;
        newImage.alt = img.alt || '';
        return newImage;
      })
    : [];

  // Handle cases where images or text content might be missing
  if (!firstParagraph.textContent && images.length === 0) {
    console.warn('No content found to generate columns');
    return;
  }

  // Build the content row
  rows.push([firstParagraph, images]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(table);
}