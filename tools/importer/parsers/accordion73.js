/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the exact header row
  rows.push(["Accordion"]);

  // Retrieve tab sections
  const tabs = element.querySelectorAll('.panel__tab-content > .tab-pane');

  tabs.forEach(tab => {
    const titleContentPairs = [];

    // Extract titles and associated content
    const titles = tab.querySelectorAll('h5');

    titles.forEach(title => {
      const contentDiv = document.createElement('div');

      // Extract content associated with the title
      let sibling = title.nextElementSibling;
      while (sibling && sibling.tagName !== 'H5') {
        if (sibling.tagName === 'P' && sibling.textContent.trim()) {
          contentDiv.appendChild(sibling.cloneNode(true));
        } else if (sibling.tagName === 'A') {
          contentDiv.appendChild(sibling.cloneNode(true));
        } else if (sibling.tagName === 'IMG') {
          contentDiv.appendChild(sibling.cloneNode(true));
        }
        sibling = sibling.nextElementSibling;
      }

      titleContentPairs.push([title.textContent.trim(), contentDiv]);
    });

    rows.push(...titleContentPairs);
  });

  // Create the block table
  const accordionTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element
  element.replaceWith(accordionTable);
}