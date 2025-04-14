/* global WebImporter */

export default function parse(element, { document }) {
  // Helper function to create content cells properly structured
  function createLinkCell(link) {
    const cell = document.createElement('div');
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.textContent.trim();
    cell.appendChild(anchor);
    return cell;
  }

  // Extract links from the given element
  const links = Array.from(element.querySelectorAll('li a')).map((link) => createLinkCell(link));

  // Ensure valid header row as per example
  const headerRow = ['Columns'];

  // Arrange links into individual cells to maintain accessibility
  const contentRow = links.map((linkElement) => [linkElement]);

  // Build the table using WebImporter.DOMUtils.createTable
  const tableData = [headerRow, ...contentRow];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the newly created table
  element.replaceWith(blockTable);
}