/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add block name header
  const headerRow = ['Cards (no images)'];
  cells.push(headerRow);

  // Process each card
  const articleHeadings = element.querySelectorAll('h3');

  articleHeadings.forEach((heading) => {
    const cardCell = [];

    // Add heading text
    const headingText = document.createElement('div');
    headingText.textContent = heading.textContent.trim();
    headingText.style.fontWeight = 'bold';
    cardCell.push(headingText);

    // Find description paragraphs following the heading
    const descriptionContainer = document.createElement('div');
    let sibling = heading.nextElementSibling;
    while (sibling && sibling.tagName !== 'H3') {
      if (sibling.tagName === 'P') {
        const paragraph = document.createElement('p');
        paragraph.textContent = sibling.textContent.trim();
        descriptionContainer.appendChild(paragraph);
      }
      sibling = sibling.nextElementSibling;
    }

    // Add description container to cell
    cardCell.push(descriptionContainer);
    cells.push([cardCell]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}
