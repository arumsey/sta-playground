/* global WebImporter */
export default function parse(element, { document }) {
  // Extract accordion titles and corresponding content
  const accordionTitleElements = element.querySelectorAll('.accordions__toggler');

  // Initialize rows array with header row
  const rows = [];
  rows.push(['Accordion']);

  accordionTitleElements.forEach((titleElement) => {
    const title = titleElement.textContent.trim();

    const contentContainer = titleElement.nextElementSibling;

    // Clone contents of the accordions__element for accurate processing
    const contentClone = contentContainer ? contentContainer.cloneNode(true) : null;

    // Remove unwanted classes/styles for clean content
    if (contentClone) {
      contentClone.querySelectorAll('[style]').forEach(el => el.removeAttribute('style'));
      contentClone.querySelectorAll('[class]').forEach(el => el.removeAttribute('class'));
    }

    // Push extracted and cleaned content to rows
    rows.push([title, contentClone]);
  });

  // Create block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new block table
  element.replaceWith(table);
}