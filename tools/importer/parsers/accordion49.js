/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  const headerRow = ['Accordion'];
  rows.push(headerRow);

  const items = element.querySelectorAll('.teasers__teaser h5');

  items.forEach((titleElement) => {
    const titleText = titleElement.textContent.trim();

    // Gather paragraph elements after the title
    const contentElements = [];
    let node = titleElement.nextElementSibling;

    while (node && node.tagName !== 'H5') {
      if (node.tagName === 'P') {
        if (node.textContent.trim()) {
          contentElements.push(node);
        }
      } else if (node.tagName === 'A') {
        contentElements.push(node);
      }
      node = node.nextElementSibling;
    }

    rows.push([titleText, contentElements]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}