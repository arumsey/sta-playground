/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the header row
  cells.push(['Columns']);

  // Extract the content from the columns
  const columns = Array.from(element.querySelectorAll('.col-xs-12.col-sm-6'));
  const contentRow = columns.map((col) => {
    const content = [];

    // Check for image on the column
    const img = col.querySelector('img');
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      content.push(imageElement);

      const caption = img.nextElementSibling;
      if (caption && caption.tagName === 'EM') {
        const captionElement = document.createElement('em');
        captionElement.textContent = caption.textContent;
        content.push(captionElement);
      }
    }

    // Check for texts (paragraphs, headings, etc.)
    const texts = Array.from(col.querySelectorAll('h2, p, a.cta-btn'));
    texts.forEach((text) => {
      content.push(text.cloneNode(true));
    });

    return content;
  });

  cells.push(contentRow);

  // Create the columns block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}