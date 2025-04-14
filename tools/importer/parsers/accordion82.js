/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];
  const contentRows = [];

  // Extract the h6 tags and following paragraphs
  const sections = element.querySelectorAll('.col-sm-12.col-md-8.col-md-offset-2 h6');
  sections.forEach((section) => {
    const title = section.textContent.trim();
    const content = [];

    // Find the sibling paragraphs for content
    let sibling = section.nextElementSibling;
    while (sibling && sibling.tagName !== 'H6') {
      if (sibling.tagName === 'P' || sibling.tagName === 'DIV') {
        content.push(sibling.cloneNode(true));
      }
      sibling = sibling.nextElementSibling;
    }

    if (title && content.length > 0) {
      contentRows.push([title, content]);
    }
  });

  // Create the table
  const cells = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the table
  element.replaceWith(blockTable);
}