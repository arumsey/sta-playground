/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Extract content for each column and build rows
  const columns = Array.from(element.querySelectorAll('.row-flex_col')); // Ensure columns is an array

  const columnContent = columns.map((column) => {
    const teaser = column.querySelector('.teasers__teaser');

    const contentArray = [];

    // Add heading
    const heading = teaser.querySelector('h2');
    if (heading) {
      const headingElement = document.createElement('div');
      headingElement.textContent = heading.textContent.trim();
      contentArray.push(headingElement);
    }

    // Add paragraphs (if any)
    const paragraphs = teaser.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
      const text = paragraph.textContent.trim();
      if (text) {
        const paragraphElement = document.createElement('div');
        paragraphElement.textContent = text;
        contentArray.push(paragraphElement);
      }
    });

    // Add image
    const image = teaser.querySelector('img.icon');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
      contentArray.push(imgElement);
    }

    // Add link
    const link = teaser.querySelector('a.cta-btn');
    if (link) {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      contentArray.push(anchor);
    }

    return contentArray;
  });

  rows.push(columnContent);

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block); // Replace element and do not return anything
}