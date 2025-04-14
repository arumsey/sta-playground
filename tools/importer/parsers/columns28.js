/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Block Header
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Process each anchor link in the given element
  const anchors = element.querySelectorAll('a.btn--icon-rm');
  const contentRow = Array.from(anchors).map((anchor) => {
    // Extract image
    const img = anchor.querySelector('img');

    // Extract text content
    const textSpan = anchor.querySelector('.btn--icon-rm__text');
    const extraText = anchor.querySelector('.btn--icon-rm__rm');

    const content = [];

    // Add image
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt || 'Image'; // provide a default alt value
      if (img.width) {
        imageElement.width = img.width;
      }
      if (img.height) {
        imageElement.height = img.height;
      }
      content.push(imageElement);
    }

    // Add main text
    if (textSpan) {
      const textElement = document.createElement('span');
      textElement.textContent = textSpan.textContent.trim();
      content.push(textElement);
    }

    // Add extra text
    if (extraText) {
      const extraElement = document.createElement('span');
      extraElement.textContent = extraText.textContent.trim();
      content.push(extraElement);
    }

    return content;
  });

  cells.push(contentRow);

  // Create the table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}