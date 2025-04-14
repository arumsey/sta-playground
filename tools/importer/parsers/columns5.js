/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract content dynamically and avoid duplication
  const leftColumn = document.createElement('div');

  const title = element.querySelector('h3');
  if (title) {
    leftColumn.appendChild(title.cloneNode(true));
  }

  const intro = element.querySelector('.teasers__teaser span[style*="font-size: 16px;"]:not(.accordions__toggler)');
  if (intro) {
    leftColumn.appendChild(intro.cloneNode(true));
  }

  const readMoreToggle = element.querySelector('.accordions__toggler');
  const readMoreContent = element.querySelector('.accordion__element');
  if (readMoreToggle || readMoreContent) {
    const readMoreBlock = document.createElement('div');
    if (readMoreToggle) {
      readMoreBlock.appendChild(readMoreToggle.cloneNode(true));
    }
    if (readMoreContent) {
      readMoreBlock.appendChild(readMoreContent.cloneNode(true));
    }
    leftColumn.appendChild(readMoreBlock);
  }

  const rightColumn = document.createElement('div');

  const iframe = element.querySelector('iframe');
  if (iframe) {
    rightColumn.appendChild(iframe.cloneNode(true));
  }

  const cells = [
    headerRow,
    [leftColumn, rightColumn],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}