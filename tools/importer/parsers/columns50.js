/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract the headline
  const headlineElement = element.querySelector('h4');
  const headlineText = headlineElement ? headlineElement.textContent.trim() : '';

  // Extract relevant Form CRS links only
  const listItems = element.querySelectorAll('ul li a');
  const relevantLinks = Array.from(listItems)
    .filter((link) => {
      const href = link.getAttribute('href');
      return href && href.includes('Default.aspx');
    })
    .map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent.trim();
      return anchor;
    });

  // Create elements for the links
  const linksCell = document.createElement('div');
  if (relevantLinks.length > 0) {
    relevantLinks.forEach((linkElement) => linksCell.appendChild(linkElement));
  } else {
    linksCell.textContent = 'No links available';
  }

  // Prepare cells for the table
  const descriptionCell = document.createElement('div');
  descriptionCell.textContent = headlineText || 'No headline available';

  const cells = [
    headerRow,
    [descriptionCell, linksCell],
  ];

  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
