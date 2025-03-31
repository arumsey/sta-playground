/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const contentRows = Array.from(element.querySelectorAll('a.nuv-accolades__cards-tiles')).map(link => {
    const img = link.querySelector('.nuv-accolades__cards-tiles-icon picture img');
    const title = link.querySelector('h4.nuv-accolades__cards-tiles-title');
    const description = link.querySelector('p.nuv-accolades__cards-tiles-description');

    // Edge case checks
    const imageElement = img && document.createElement('img');
    if (img) {
      imageElement.src = img.src;
      imageElement.alt = img.alt;
    }

    const titleText = title ? title.textContent.trim() : '';
    const descriptionText = description ? description.textContent.trim() : '';

    const content = [
      titleText && document.createTextNode(titleText),
      document.createElement('br'),
      descriptionText && document.createTextNode(descriptionText),
    ].filter(Boolean); // Remove empty nodes or falsey values

    return [imageElement, content];
  });

  const tableData = [headerRow, ...contentRows];

  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
