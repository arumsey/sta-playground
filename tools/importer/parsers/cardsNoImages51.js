/* global WebImporter */
export default function parse(element, { document }) {
  // Header row based on the block type description
  const headerRow = ['Cards (no images)'];

  // Initialize content rows array to populate dynamically
  const contentRows = [];

  // Extract the main title (h2 element)
  const title = element.querySelector('h2:not([style="display:none;"])');
  if (title) {
    const titleText = document.createElement('h2');
    titleText.textContent = title.textContent.trim();

    // Extract paragraphs within the block
    const paragraphs = element.querySelectorAll('p');
    const paragraphElements = Array.from(paragraphs).map((p) => {
      const el = document.createElement('p');
      el.textContent = p.textContent.trim();
      return el;
    });

    // Extract unordered list (if exists)
    const ul = element.querySelector('ul');
    const ulElement = ul ? ul.cloneNode(true) : null;

    // Extract call-to-action button (if exists)
    const cta = element.querySelector('.cta-btn');
    const ctaElement = cta ? cta.cloneNode(true) : null;

    // Compile the card content
    const cardContent = [titleText, ...paragraphElements];
    if (ulElement) {
      cardContent.push(ulElement);
    }
    if (ctaElement) {
      cardContent.push(ctaElement);
    }

    // Add the cardContent to a content row
    contentRows.push([cardContent]);
  }

  // Combine header row and content rows
  const tableRows = [headerRow, ...contentRows];

  // Create the final block table
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}