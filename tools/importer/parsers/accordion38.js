/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create an accordion item
  function createAccordionItem(title, content) {
    return [title.cloneNode(true), content.cloneNode(true)];
  }

  // Extract the existing accordions dynamically
  const togglers = element.querySelectorAll('.accordions__toggler');
  const elements = element.querySelectorAll('.accordions__element');

  const accordionItems = [];

  // Validate for missing accordion items
  if (togglers.length !== elements.length) {
    console.warn('Mismatch between togglers and contents detected');
  }

  // Populate accordion items
  togglers.forEach((toggler, index) => {
    const title = toggler.cloneNode(true);
    const content = elements[index] ? elements[index].cloneNode(true) : document.createElement('div');
    accordionItems.push(createAccordionItem(title, content));
  });

  // Create the table structure with a bold header
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Accordion';

  const cells = [
    headerRow, // Correctly bolded header
    ...accordionItems // Dynamic accordion content
  ];

  // Create the new table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the element with the generated table block
  element.replaceWith(block);
}