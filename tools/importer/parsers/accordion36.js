/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Accordion']);

  // Query and process accordion items
  const accordions = element.querySelectorAll('.teasers__teaser');
  accordions.forEach((accordion) => {
    const title = accordion.querySelector('.accordions__toggler').textContent.trim();
    const contentElement = accordion.querySelector('.accordions__element');

    const content = Array.from(contentElement.childNodes).map((node) => {
      if (node.nodeType === 3 /* TEXT_NODE */) {
        return node.textContent.trim();
      } else {
        return node;
      }
    }).filter(item => item);

    rows.push([title, content]);
  });

  // Create table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}