/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const cells = [headerRow];

  const contentRows = [...element.querySelectorAll('.col-xs-12')].map((column) => {
    const title = column.querySelector('h3');
    const paragraph = column.querySelector('p');
    const link = column.querySelector('a');
    const image = column.querySelector('img');

    const cellContent = [];

    if (image && image.src) {
      const imgElement = document.createElement('img');
      imgElement.src = image.src;
      imgElement.alt = image.alt || '';
      cellContent.push(imgElement);
    }

    if (title && title.textContent.trim()) {
      const titleElement = document.createElement('p');
      titleElement.textContent = title.textContent.trim();
      cellContent.push(titleElement);
    }

    if (paragraph && paragraph.textContent.trim()) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph.textContent.replace(/[\s]+/g, ' ').trim();
      cellContent.push(paragraphElement);
    }

    if (link && link.href && link.textContent.trim()) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.textContent = link.textContent.trim();
      cellContent.push(linkElement);
    }

    return [cellContent.length > 0 ? cellContent : ['']];
  });

  cells.push(...contentRows);

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}