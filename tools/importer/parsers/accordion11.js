/* global WebImporter */
export default function parse(element, { document }) {
  // Define header row for the Accordion block
  const headerRow = ['Accordion'];

  // Find all accordion toggler elements and their content
  const togglerElements = element.querySelectorAll('.accordions__toggler');
  const accordionContentElements = element.querySelectorAll('.accordions__element');
  const rows = [];

  togglerElements.forEach((toggler, index) => {
    const contentElement = accordionContentElements[index];
    const togglerTitle = toggler.textContent.trim();

    // Validate content elements exist
    const contentNodes = contentElement ? Array.from(contentElement.childNodes).map((node) => node.cloneNode(true)) : [document.createTextNode('')];

    rows.push([togglerTitle, contentNodes]);
  });

  // Create the table using the helper function
  const cells = [headerRow, ...rows];
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(tableBlock);
}