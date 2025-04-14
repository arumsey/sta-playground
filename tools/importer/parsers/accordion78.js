/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Helper function to extract content from accordion structure
  const extractAccordionContent = (togglerElement) => {
    const title = togglerElement ? togglerElement.textContent.trim() : '';

    const contentContainer = togglerElement.nextElementSibling;
    const content = [];

    if (contentContainer) {
      contentContainer.querySelectorAll('p, ul, img').forEach((child) => {
        content.push(child.cloneNode(true));
      });
    } else {
      content.push(document.createTextNode('')); // Handle empty content edge case
    }

    return [title, content];
  };

  // Gather toggler elements
  const togglerElements = element.querySelectorAll('.accordions__toggler');

  const rows = Array.from(togglerElements).map((toggler) => extractAccordionContent(toggler));

  const tableData = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}