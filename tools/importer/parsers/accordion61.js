/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  // Create rows based on the accordion toggler and its corresponding content
  const rows = Array.from(element.querySelectorAll('.accordions__toggler')).map((toggler) => {
    const content = toggler.nextElementSibling;

    // Use trimmed text content for toggler and clone the content node
    const titleCell = toggler.textContent.trim();
    const contentCell = content && content.cloneNode(true);

    return [titleCell, contentCell];
  }).filter(row => row[0] && row[1]); // Filter out rows with empty title or content

  // Combine header row with rows extracted from the element
  const tableData = [headerRow, ...rows];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(block);

  // Ensure the function does not return anything per the instructions
}