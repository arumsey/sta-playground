/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract content for accordions
  function extractAccordion(element) {
    const titleElements = element.querySelectorAll('p.accordions__toggler');
    const contentElements = element.querySelectorAll('div.accordions__element');

    const rows = [];

    titleElements.forEach((titleEl, index) => {
      const contentEl = contentElements[index];
      if (contentEl) {
        const title = titleEl.textContent.trim();
        const content = contentEl.innerHTML.trim();

        // Wrap extracted content with a div
        const contentDiv = document.createElement('div');
        contentDiv.innerHTML = content;

        // Create rows using extracted dynamic content
        rows.push([title, contentDiv]);
      }
    });

    return rows;
  }

  // Block header specific to accordion type
  const headerRow = ['Accordion'];

  // Safely extract accordion rows
  const accordionRows = extractAccordion(element);

  // Combine header and content rows
  const tableRows = [headerRow, ...accordionRows];

  // Use the helper function to create the structured block from the rows
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the newly created accordion block
  element.replaceWith(block);
}