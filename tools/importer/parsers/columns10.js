/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extracting left column content
  const leftColumn = element.querySelector('.col-sm-8');
  const leftTeaser = leftColumn ? leftColumn.querySelector('.teasers__teaser') : null;

  const leftContent = [];
  if (leftTeaser) {
    const paragraphs = leftTeaser.querySelectorAll('p');
    paragraphs.forEach((p) => {
      leftContent.push(p.cloneNode(true));
    });

    const headers = leftTeaser.querySelectorAll('h3, h5');
    headers.forEach((header) => {
      leftContent.push(header.cloneNode(true));
    });

    const links = leftTeaser.querySelectorAll('a');
    links.forEach((link) => {
      leftContent.push(link.cloneNode(true));
    });

    const textNodes = Array.from(leftTeaser.childNodes).filter(
      (node) => node.nodeType === document.TEXT_NODE && node.textContent.trim()
    );
    textNodes.forEach((text) => {
      const span = document.createElement('span');
      span.textContent = text.textContent.trim();
      leftContent.push(span);
    });
  }

  // Extracting right column content
  const rightColumn = element.querySelector('.col-sm-4, .col-sm-6');
  const rightTeaser = rightColumn ? rightColumn.querySelector('.teasers__teaser') : null;

  const rightContent = [];
  if (rightTeaser) {
    const images = rightTeaser.querySelectorAll('img');
    images.forEach((img) => {
      rightContent.push(img.cloneNode(true));
    });

    const paragraphs = rightTeaser.querySelectorAll('p');
    paragraphs.forEach((p) => {
      rightContent.push(p.cloneNode(true));
    });

    const links = rightTeaser.querySelectorAll('a');
    links.forEach((link) => {
      rightContent.push(link.cloneNode(true));
    });

    const textNodes = Array.from(rightTeaser.childNodes).filter(
      (node) => node.nodeType === document.TEXT_NODE && node.textContent.trim()
    );
    textNodes.forEach((text) => {
      const span = document.createElement('span');
      span.textContent = text.textContent.trim();
      rightContent.push(span);
    });
  }

  // Creating rows for the table
  const rows = [headerRow, [leftContent, rightContent]];

  // Creating the table block
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replacing the original element
  element.replaceWith(blockTable);
}