/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Accordion']; // Correct header row matching example
  const rows = [];

  // Extracting accordion sections
  const togglers = element.querySelectorAll('.accordions__toggler');
  const contents = element.querySelectorAll('.accordions__element');

  togglers.forEach((toggler, index) => {
    const title = toggler.textContent.trim();
    const contentContainer = contents[index];

    if (contentContainer) {
      const contentElements = Array.from(contentContainer.querySelectorAll('.teasers__teaser > *'));
      // Handle cases where content might be empty
      const content = contentElements.length > 0 ? contentElements : '';
      rows.push([title, content]);
    } else {
      rows.push([title, '']); // Add empty content if none found
    }
  });

  // Create table
  const tableArray = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the original element
  element.replaceWith(blockTable);
}