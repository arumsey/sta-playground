/* global WebImporter */
export default function parse(element, { document }) {
  // Extract heading dynamically
  const heading = element.querySelector('h2') ? element.querySelector('h2').cloneNode(true) : document.createTextNode('');

  // Extract non-empty paragraphs while excluding placeholders
  const paragraphs = Array.from(element.querySelectorAll('p'))
    .filter(p => p.textContent.trim() !== '' && p.textContent.trim() !== '&nbsp;')
    .map(p => p.cloneNode(true));

  // Extract list items and ensure their logical separation
  const unorderedList = element.querySelector('ul');
  const list = unorderedList ? unorderedList.cloneNode(true) : null;

  // Extract CTA button dynamically
  const ctaBtn = element.querySelector('a.cta-btn') ? element.querySelector('a.cta-btn').cloneNode(true) : document.createTextNode('');

  // Extract table data dynamically, ensuring headers and rows match the example
  const table = element.querySelector('#tableData');
  let tableBlock = null;
  if (table) {
    const tableHeaderCells = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
    const tableRows = Array.from(table.querySelectorAll('tbody tr')).map(tr => 
      Array.from(tr.querySelectorAll('td')).map(td => td.textContent.trim())
    );
    tableBlock = WebImporter.DOMUtils.createTable([
      tableHeaderCells,
      ...tableRows
    ], document);
  }

  // Fix header row to exactly match the example
  const headerRow = ['Columns'];

  // Build cells array with corrected structure
  const cells = [
    headerRow, // Exact header row
    [
      heading, // First column
      paragraphs, // Second column: non-empty paragraphs
      list // Third column: unordered list as a separate cell
    ].filter(Boolean),
    [
      ctaBtn // Row for CTA button
    ],
    tableBlock ? [tableBlock] : [] // Table block row, only if table exists
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the corrected structure
  element.replaceWith(blockTable);
}