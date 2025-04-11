/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  const headerRow = ['Columns'];
  rows.push(headerRow);

  // Extract content rows
  const contentRow = [];
  const columnElements = element.querySelectorAll('.columns.list.block.columns-2-cols > div');

  columnElements.forEach((column) => {
    const parts = [];

    // Extract image
    const image = column.querySelector('picture > img');
    if (image) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
      parts.push(imgElement);
    }

    // Extract and consolidate text into a single coherent structure
    const textContainer = column.querySelector('div:not(:first-child)');
    if (textContainer) {
      const consolidatedText = document.createElement('div');

      // Add heading text if available
      const heading = textContainer.querySelector('strong');
      if (heading) {
        const headingElement = document.createElement('strong');
        headingElement.textContent = heading.textContent;
        consolidatedText.appendChild(headingElement);
      }

      // Add description paragraphs
      textContainer.querySelectorAll('p').forEach((paragraph) => {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent.trim();
        consolidatedText.appendChild(paragraphElement);
      });

      // Add links uniquely
      textContainer.querySelectorAll('a').forEach((link) => {
        if (!consolidatedText.querySelector(`a[href="${link.href}"]`)) {
          const linkElement = document.createElement('a');
          linkElement.href = link.href;
          linkElement.title = link.title || '';
          linkElement.textContent = link.textContent;
          consolidatedText.appendChild(linkElement);
        }
      });

      parts.push(consolidatedText);
    }

    contentRow.push(parts);
  });

  rows.push(contentRow);

  // Create table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element
  element.replaceWith(table);
}