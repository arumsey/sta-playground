/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row, ensuring proper bolded structure as per example
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';

  const cells = [headerRow]; // Initialize cells with the header row

  const togglers = element.querySelectorAll('.accordions__toggler');

  // Extract each accordion toggler and its content dynamically
  togglers.forEach((toggler) => {
    const title = toggler.textContent.trim(); // Extract the title

    const contentElem = toggler.nextElementSibling;
    const contentBlocks = [];

    if (contentElem && contentElem.classList.contains('accordions__element')) {
      // Handle deeply nested child elements and mixed content
      Array.from(contentElem.childNodes).forEach((child) => {
        if (child.nodeType === 3) { // TEXT_NODE
          const textContent = child.textContent.trim();
          if (textContent) {
            contentBlocks.push(document.createTextNode(textContent));
          }
        } else if (child.nodeType === 1) { // ELEMENT_NODE
          contentBlocks.push(child.cloneNode(true));
        }
      });
    }

    // Push rows with extracted title and content (ensure no empty rows)
    cells.push([title, contentBlocks.length ? contentBlocks : document.createTextNode('')]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(table);
}