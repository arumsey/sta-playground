/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row implementation
  const headerRow = ['Accordion'];

  // Extract toggler elements and content dynamically from the provided HTML
  const togglerElements = [...element.querySelectorAll('.accordions__toggler')];
  const contentElements = [...element.querySelectorAll('.accordions__element')];

  // Ensure valid structure, extracting both title and content dynamically
  const rows = togglerElements.map((toggler, index) => {
    const content = contentElements[index] ? contentElements[index].innerHTML.trim() : '';
    const contentCell = document.createElement('div');
    contentCell.innerHTML = content;
    return [toggler.textContent.trim(), contentCell];
  });

  // Use WebImporter.DOMUtils.createTable correctly
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}