/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to extract title and content from the HTML segments
  const extractAccordionItems = (container) => {
    const items = [];

    // Loop through each accordion item
    const teasers = container.querySelectorAll('.teasers__teaser');
    teasers.forEach((teaser) => {
      const titleElement = teaser.querySelector('.accordions__toggler');
      const contentElement = teaser.querySelector('.accordions__element');
      
      // Validate if title and content exist
      if (titleElement && contentElement) {
        const title = titleElement.textContent.trim();

        // Check for valid content or apply fallback for empty elements
        const content = contentElement.childNodes.length > 0
          ? Array.from(contentElement.childNodes).map((node) => node.cloneNode(true))
          : document.createElement('p').appendChild(document.createTextNode('Content not available'));

        items.push([title, content]); // Push structured data as cell content
      } else {
        // Add fallback for missing title or content
        items.push([
          titleElement ? titleElement.textContent.trim() : 'Title not available',
          document.createElement('p').appendChild(document.createTextNode('Content not available')),
        ]);
      }
    });

    return items;
  };

  // Start parsing
  const accordionRows = extractAccordionItems(element);
  const headerRow = ['Accordion'];
  const tableData = [headerRow, ...accordionRows];

  // Create the new table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}