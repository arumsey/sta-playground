/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];
  const cells = [
    headerRow,
  ];

  // Extract image from the style background source
  const imageElement = document.createElement('img');
  const backgroundStyle = element.querySelector('.panel__image')?.style.backgroundImage;
  if (backgroundStyle) {
    const imageUrl = backgroundStyle.match(/url\('?(.+?)'?\)/)?.[1];
    if (imageUrl) {
      imageElement.src = imageUrl;
    }
  }

  // Extract content
  const kicker = element.querySelector('.panel__kicker')?.textContent.trim();
  const headline = element.querySelector('.panel__headline')?.textContent.trim();

  const contentBlock = document.createElement('div');
  if (kicker) {
    const kickerElement = document.createElement('p');
    kickerElement.textContent = kicker;
    contentBlock.appendChild(kickerElement);
  }

  if (headline) {
    const headlineElement = document.createElement('h1');
    headlineElement.textContent = headline;
    contentBlock.appendChild(headlineElement);
  }

  const combinedRow = [imageElement, contentBlock];
  cells.push(combinedRow);

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}