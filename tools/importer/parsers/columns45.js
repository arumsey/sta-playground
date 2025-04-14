/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Combine all tab buttons into one cell (single column), preserving aesthetics
  const buttonsContainer = document.createElement('div');
  Array.from(element.querySelectorAll('button')).forEach((button) => {
    const tabContent = document.createElement('div');
    tabContent.textContent = button.textContent;
    tabContent.className = button.className; // Preserve styling for active/inactive buttons
    buttonsContainer.appendChild(tabContent);
  });

  // Create rows for table: header + content (tabs consolidated into one column)
  const cells = [
    headerRow,
    [buttonsContainer],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new block table
  element.replaceWith(blockTable);
}