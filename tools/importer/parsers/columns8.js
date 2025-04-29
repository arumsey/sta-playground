/* global WebImporter */
export default function parse(element, { document }) {
  const hr = document.createElement('hr');

  const createCellContent = (teaser) => {
    const img = teaser.querySelector('img');
    const heading = teaser.querySelector('h3, h4');
    const link = teaser.querySelector('a');
    const paragraph = teaser.querySelector('p:not(:empty)');

    const content = [];
    if (img) {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt || '';
      content.push(imageElement);
    }

    if (heading) {
      const headingElement = document.createElement(heading.tagName.toLowerCase());
      headingElement.textContent = heading.textContent.trim();
      content.push(headingElement);
    }

    if (paragraph) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph.textContent.trim();
      content.push(paragraphElement);
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      content.push(linkElement);
    }

    return content;
  };

  const teasers = element.querySelectorAll('.teasers__teaser');
  const rows = Array.from(teasers).map(createCellContent);

  const tableData = [['Columns'], rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(hr, blockTable);
}