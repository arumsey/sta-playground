/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const cells = [
    headerRow,
  ];

  const accordions = element.querySelectorAll('.accordions__toggler');

  accordions.forEach((accordion) => {
    const title = accordion.textContent.trim();
    const contentContainer = accordion.nextElementSibling;
    const contentElements = [];

    if (contentContainer) {
      const paragraphs = contentContainer.querySelectorAll('p');
      const lists = contentContainer.querySelectorAll('ul');

      paragraphs.forEach(p => contentElements.push(p.cloneNode(true)));
      lists.forEach(list => contentElements.push(list.cloneNode(true)));
    }

    cells.push([title, contentElements]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}