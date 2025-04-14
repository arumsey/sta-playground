/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cells = [headerRow];

  const rows = element.querySelectorAll('.col-xs-12');

  rows.forEach((row) => {
    const image = row.querySelector('img');
    const title = row.querySelector('h3');
    const description = row.querySelector('p:not(.accordions__toggler):not(.accordion__element)');
    const extraDescription = row.querySelector('p.accordion__element');

    const imageElement = document.createElement('img');
    imageElement.src = image?.src || '';
    imageElement.alt = image?.alt || '';

    const titleElement = document.createElement('h3');
    titleElement.textContent = title?.textContent || '';

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = description?.textContent || '';

    const contentArray = [titleElement, descriptionElement];

    if (extraDescription) {
      const extraDescriptionElement = document.createElement('p');
      extraDescriptionElement.textContent = extraDescription?.textContent || '';
      contentArray.push(extraDescriptionElement);
    }

    cells.push([imageElement, contentArray]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}