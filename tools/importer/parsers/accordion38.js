/* global WebImporter */
export default function parse(element, { document }) {
  // Create the cells array to hold rows for the table
  const cells = [];

  // Add the header row for the block type with proper formatting
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';
  cells.push(headerRow);

  // Select all accordion toggler elements (assumed title elements)
  const accordionTogglers = element.querySelectorAll('p.accordions__toggler');

  // Iterate over each toggler to build table rows
  accordionTogglers.forEach((toggler) => {
    const title = toggler.textContent.trim(); // Extract the title

    // Get the associated content (next sibling with accordion__element class)
    const contentElement = toggler.nextElementSibling;

    let content = '';
    // Ensure the content element exists and is of the expected class
    if (contentElement && contentElement.classList.contains('accordion__element')) {
      content = contentElement.innerHTML.trim(); // Extract the inner HTML content
      // Normalize excessive spaces and &nbsp;
      content = content.replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
    }

    const row = [title, content]; // Prepare the row with title and content
    cells.push(row);
  });

  // Create the block table using WebImporter.DOMUtils.createTable
  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the generated table block
  element.replaceWith(tableBlock);
}