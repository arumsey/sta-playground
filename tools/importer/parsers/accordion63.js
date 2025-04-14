/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];
  
  // Add the header row
  cells.push(['Accordion']);

  // Parse all accordion toggler and corresponding content
  const togglers = element.querySelectorAll('.accordions__toggler');
  const contents = element.querySelectorAll('.accordions__element');

  togglers.forEach((toggler, index) => {
    const title = toggler.textContent.trim();
    const content = contents[index].cloneNode(true);
    
    // Append next rows to the table
    cells.push([title, content]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}