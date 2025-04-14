/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const accordions = [];

  // Extracting accordion toggles and their contents dynamically
  const toggles = element.querySelectorAll('.accordions__toggler');
  const contents = element.querySelectorAll('.accordions__element');

  toggles.forEach((toggle, index) => {
    const titleCell = toggle.textContent.trim(); // Dynamically extract title text

    // Handle empty content gracefully
    const contentCell = document.createElement('div');
    const contentHTML = contents[index]?.innerHTML || 'No content available';
    contentCell.innerHTML = contentHTML; // Dynamically inject content

    accordions.push([titleCell, contentCell]);
  });

  // Creating table data structure with header & rows dynamically
  const tableData = [headerRow, ...accordions];

  // Utilizing WebImporter helper to create table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replacing original element with the created accordion block
  element.replaceWith(block);
}