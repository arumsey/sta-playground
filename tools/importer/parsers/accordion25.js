/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  // Extract all accordion toggler and content elements
  const togglers = Array.from(element.querySelectorAll('.accordions__toggler'));
  const contents = Array.from(element.querySelectorAll('.accordions__element'));

  togglers.forEach((toggler, index) => {
    const title = toggler?.textContent?.trim() || 'No Title';

    const contentElement = contents[index];
    let content = 'No Content';

    if (contentElement) {
      content = contentElement.innerHTML.trim();
    }

    rows.push([title, content]);
  });

  const tableData = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(block);
}