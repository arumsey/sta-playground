/* global WebImporter */
export default function parse(element, { document }) {
  // Extract unique carousel items by filtering duplicates
  const items = Array.from(element.querySelectorAll('.logos > div'))
    .filter((item, index, self) => {
      const imageElement = item.querySelector('picture img');
      return imageElement && !imageElement.hasAttribute('loading');
    });

  // Header row matches the example exactly
  const headerRow = ['Carousel'];

  // Map items to rows dynamically
  const rows = items.map((item) => {
    const imageElement = item.querySelector('picture img');
    const imageCell = imageElement || '';
    const textContent = item.querySelector('div:nth-of-type(2)');
    const textCell = textContent && textContent.textContent.trim() ? textContent.textContent : '';
    return [imageCell, textCell];
  });

  const tableArray = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(blockTable);
}