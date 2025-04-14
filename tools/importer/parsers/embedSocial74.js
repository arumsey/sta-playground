/* global WebImporter */
export default function parse(element, { document }) {
  const links = Array.from(element.querySelectorAll('a')).map(link => link.href);
  
  const headerRow = ['Embed'];
  const contentRow = [links.join('<br>')];
  
  const cells = [
    headerRow,
    contentRow,
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  
  element.replaceWith(table);
}