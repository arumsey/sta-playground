/* global WebImporter */
export default function parse(element, { document }) {
  // Extract rows to build the table
  const rows = Array.from(element.querySelectorAll('.col-xs-12.col-sm-4')).map(col => {
    const img = col.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = img?.src || '';
    imgElement.alt = img?.alt || '';

    const strong = col.querySelector('strong');
    const title = strong?.querySelector('span[style*="font-size: 20px;"]')?.textContent.trim() || '';
    const description = strong?.nextElementSibling?.textContent.trim() || '';

    const link = col.querySelector('.panel__links a');
    const ctaLink = link ? document.createElement('a') : null;
    if (ctaLink) {
      ctaLink.href = link.href;
      ctaLink.textContent = link.textContent;
    }

    const textContent = [];
    if (title) {
      const heading = document.createElement('strong');
      heading.textContent = title;
      textContent.push(heading);
    }
    if (description) {
      const paragraph = document.createElement('p');
      paragraph.textContent = description;
      textContent.push(paragraph);
    }
    if (ctaLink) {
      textContent.push(ctaLink);
    }

    return [imgElement, textContent];
  });

  // Create the header row
  const headerRow = ['Cards'];

  // Construct the table
  const cells = [
    headerRow,
    ...rows
  ];

  const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(tableBlock);
}