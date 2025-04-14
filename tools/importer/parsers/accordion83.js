/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const rows = [];

  // Function to extract title and content from accordion sections
  const extractAccordionData = (titleElement, contentElement) => {
    const title = titleElement ? titleElement.textContent.trim() : '';

    const contentParts = [];
    if (contentElement) {
      contentElement.querySelectorAll('p, ul').forEach((node) => {
        if (node.nodeType === 1) { // Element nodes
          contentParts.push(node.cloneNode(true));
        } else if (node.nodeType === 3) { // Text nodes
          const textNode = document.createTextNode(node.textContent.trim());
          contentParts.push(textNode);
        }
      });
    }

    return [title, contentParts];
  };

  // Extract title and content for each accordion
  const accordionTitles = element.querySelectorAll('.accordions__toggler');
  const accordionContents = element.querySelectorAll('.accordions__element');
  
  accordionTitles.forEach((titleElement, index) => {
    const contentElement = accordionContents[index];
    const [title, contentParts] = extractAccordionData(titleElement, contentElement);
    if (title || contentParts.length) {
      rows.push([title, contentParts]);
    }
  });

  const cells = [headerRow, ...rows];

  // Generate block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}