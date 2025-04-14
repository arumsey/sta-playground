/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = [document.createElement('strong')]; // Create header row with matching <strong> tag for correct structure
  headerRow[0].textContent = 'Accordion';

  // Extract accordion headers and contents dynamically
  const rows = [];
  const togglerSelector = 'p.accordions__toggler';
  const contentSelector = 'div.accordions__element';

  // Find all toggler elements (accordion headers)
  const togglers = Array.from(element.querySelectorAll(togglerSelector));
  const contents = Array.from(element.querySelectorAll(contentSelector));

  togglers.forEach((toggler, index) => {
    const titleElement = toggler.cloneNode(true); // Clone the title element
    const contentElement = contents[index]?.cloneNode(true); // Clone the corresponding content element dynamically

    if (contentElement) {
      rows.push([titleElement, contentElement]);
    } else {
      // Handle edge case: missing content element
      rows.push([titleElement, document.createTextNode('')]);
    }
  });

  // Prepare the table array with a header row and content rows
  const tableData = [headerRow, ...rows];

  // Generate the table using the `createTable` helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly structured block table
  element.replaceWith(blockTable);
}