/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  const headerRow = ['Accordion'];
  rows.push(headerRow);

  // Process accordion items
  const accordionElement = element.querySelector('.accordions__element');
  const title = element.querySelector('.accordions__toggler')?.textContent.trim() || '';
  const contentContainer = accordionElement.querySelector('div');
  const contentElements = Array.from(contentContainer.childNodes)
    .filter((node) => node.nodeType === 1 /* ELEMENT_NODE */ || (node.nodeType === 3 /* TEXT_NODE */ && node.textContent.trim()))
    .map((node) => (node.nodeType === 3 ? document.createTextNode(node.textContent.trim()) : node));

  const row = [title, contentElements];
  rows.push(row);

  // Create and replace accordion table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}