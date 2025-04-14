/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Create the header row with exact text match from example
  const headerRow = ['Columns'];
  cells.push(headerRow);

  // Extract relevant content dynamically from the HTML
  const teasers = element.querySelectorAll('.teasers__teaser');

  if (teasers.length === 0) {
    console.error('No teasers found in the provided element.');
    return;
  }

  const rowData = [];

  Array.from(teasers).forEach(teaser => {
    const content = [];

    // Extract image if present
    const img = teaser.querySelector('img');
    if (img && img.src) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt;
      content.push(imageElement);
    }

    // Extract heading if present
    const h3 = teaser.querySelector('h3');
    if (h3 && h3.textContent.trim()) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = h3.textContent.trim();
      content.push(headingElement);
    }

    // Extract unordered list if present
    const ul = teaser.querySelector('ul');
    if (ul && ul.children.length > 0) {
      const listElement = document.createElement('ul');
      Array.from(ul.children).forEach(li => {
        if (li.textContent.trim()) {
          const listItem = document.createElement('li');
          listItem.textContent = li.textContent.trim();
          listElement.appendChild(listItem);
        }
      });
      content.push(listElement);
    }

    // Extract paragraph text dynamically
    const paragraphs = teaser.querySelectorAll('p');
    paragraphs.forEach(paragraph => {
      if (paragraph.textContent.trim()) {
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent.trim();
        content.push(paragraphElement);
      }
    });

    // Extract links if present
    const links = teaser.querySelectorAll('a');
    links.forEach(link => {
      if (link.href && link.textContent.trim()) {
        const anchorElement = document.createElement('a');
        anchorElement.href = link.href;
        anchorElement.textContent = link.textContent.trim();
        content.push(anchorElement);
      }
    });

    // Handle edge cases of separators or mismatched empty sections
    const separatorHr = teaser.querySelector('hr');
    if (separatorHr) {
      const hrElement = document.createElement('hr');
      content.push(hrElement);
    }

    rowData.push(content);
  });

  // Ensure proper row structure
  cells.push(rowData);

  // Create the table using the helper function
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}