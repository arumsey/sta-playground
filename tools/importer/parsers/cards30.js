/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [
    ['Cards'] // Header row
  ];

  const cardElements = Array.from(element.querySelectorAll('.ct01__content .ct01__item'));

  cardElements.forEach((cardElement) => {
    const image = cardElement.querySelector('img');
    const title = cardElement.querySelector('h2, h3, h4');
    const description = cardElement.querySelector('p');

    const imageElement = image ? WebImporter.DOMUtils.createTable([[image]], document) : null;

    const textContent = document.createElement('div');
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent;
      textContent.appendChild(titleElement);
      textContent.appendChild(document.createElement('br'));
    }
    if (description) {
      const descriptionElement = document.createTextNode(description.textContent);
      textContent.appendChild(descriptionElement);
    }

    cells.push([
      imageElement || '',
      textContent
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}