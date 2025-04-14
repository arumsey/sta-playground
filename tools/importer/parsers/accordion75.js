/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row matching the example exactly
  const headerRow = ['Accordion'];
  rows.push(headerRow);

  // Extract accordion items dynamically
  const accordionSections = element.querySelectorAll('.accordions__toggler, .accordion__element');
  accordionSections.forEach((section) => {
    if (section.classList.contains('accordions__toggler')) {
      const title = section.textContent.trim();
      const nextSibling = section.nextElementSibling;
      const content = document.createElement('div');

      if (nextSibling && nextSibling.classList.contains('accordion__element')) {
        content.append(...Array.from(nextSibling.childNodes));
      }

      rows.push([title, content]);
    }
  });

  // Create the block table using WebImporter.DOMUtils
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table without returning anything
  element.replaceWith(block);
}