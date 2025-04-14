/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row for the Accordion block
  const headerRow = ['Accordion'];

  // Extract all accordion items dynamically
  const accordionItems = Array.from(element.querySelectorAll('.accordions__toggler'));

  if (accordionItems.length === 0) {
    console.error('No accordion items found in the provided element.');
    return;
  }

  // Map extracted accordion items to rows for the table
  const rows = accordionItems.map((item) => {
    const titleText = item.textContent.trim();
    const title = document.createElement('div');
    title.textContent = titleText;

    const contentSibling = item.nextElementSibling;
    let content;
    if (contentSibling) {
      content = contentSibling.cloneNode(true); // Clone content dynamically
    } else {
      content = document.createElement('div');
      content.textContent = 'No content available';
    }

    return [title, content];
  });

  // Add the header row at the beginning of the data
  const tableData = [headerRow, ...rows];

  // Validate the tableData structure
  if (!Array.isArray(tableData) || tableData.length < 2) {
    console.error('Table data structure is invalid.');
    return;
  }

  // Create the block table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);

  console.log('Accordion block successfully created and element replaced.');
}