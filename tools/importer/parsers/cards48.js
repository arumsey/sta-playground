/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [['Cards']];

  // Iterate through all "col-xs-12 col-sm-4" elements
  const cards = element.querySelectorAll('.col-xs-12.col-sm-4');
  cards.forEach((card) => {
    const image = card.querySelector('img');
    const title = card.querySelector('strong span span');
    const titleText = title ? title.textContent.trim() : 'No Title'; // Ensure title content gets populated

    const description = card.querySelector('br + span') || card.querySelector('strong + span');

    const link = card.querySelector('ul.panel__links a');
    // Create structured content for one card
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    const titleElement = document.createElement('strong');
    titleElement.textContent = titleText;

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description?.textContent.trim() || '';

    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();

    const contentCell = [titleElement, descriptionElement, linkElement];
    rows.push([imageElement, contentCell]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}