/* global WebImporter */
export default function parse(element, { document }) {
  // Define the first row which serves as the block header.
  const headerRow = ['Accordion'];

  // Extract content dynamically from the element.
  const rows = Array.from(element.querySelectorAll('.accordions__toggler')).map((titleElement) => {
    const title = titleElement.textContent.trim();
    const contentElem = titleElement.nextElementSibling;

    // Handle the case where the content element is missing.
    const content = contentElem ? contentElem.innerHTML.trim() : '';

    // Create title and content cells as proper HTML elements.
    const titleCell = document.createElement('div');
    titleCell.textContent = title;

    const contentCell = document.createElement('div');
    contentCell.innerHTML = content;

    // Return the row with title and content cells.
    return [titleCell, contentCell];
  });

  // Create the block table using the WebImporter helper.
  const block = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

  // Replace the original element with the newly created block.
  element.replaceWith(block);
}