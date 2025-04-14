/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract left column content dynamically
  const leftColumnContainer = element.querySelector('.col-sm-6:first-child');

  if (!leftColumnContainer) {
    throw new Error("Left column content not found");
  }

  const leftContent = Array.from(leftColumnContainer.childNodes).map((node) => {
    if (node.nodeType === 1) { // ELEMENT_NODE
      if (node.tagName === 'A') {
        const link = document.createElement('a');
        link.href = node.href;
        link.textContent = node.textContent.trim();
        return link;
      } else {
        return node.cloneNode(true);
      }
    } else if (node.nodeType === 3) { // TEXT_NODE
      const text = node.textContent.trim();
      if (text) {
        return document.createTextNode(text);
      }
    }
  }).filter(Boolean); // Remove any null or undefined content

  // Extract right column content dynamically (image + caption)
  const rightColumnImg = element.querySelector('.col-sm-6:last-child img');
  const rightColumnCaption = element.querySelector('.col-sm-6:last-child em span');

  const image = rightColumnImg ? rightColumnImg.cloneNode(true) : document.createElement('img');
  const caption = rightColumnCaption ? document.createTextNode(rightColumnCaption.textContent.trim()) : document.createTextNode('');

  const rightContent = [image, caption];

  // Table structure
  const cells = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}