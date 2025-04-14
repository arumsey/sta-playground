/* global WebImporter */
export default function parse(element, { document }) {
  // Extract tabs content and labels
  const tabLabels = Array.from(
    element.querySelectorAll(
      '.navigation__desktop__secondary-menu li a'
    )
  ).map((tab) => tab.textContent.trim());

  const tabContentElements = Array.from(
    element.querySelectorAll('.navigation__desktop__tertiary-menu__content > li')
  );

  const tabContents = tabContentElements.map((content) => {
    const titleElement = content.querySelector('h3');
    const title = titleElement ? titleElement.textContent.trim() : '';
    const linkElements = content.querySelectorAll('a');
    const links = Array.from(linkElements).map((link) => link.cloneNode(true));

    const container = document.createElement('div');
    if (titleElement) container.appendChild(titleElement.cloneNode(true));
    container.append(...links);

    return container;
  });

  // Critical Fix: Ensure header row matches example exactly
  const headerRow = ['Tabs']; // Matches example header row

  // Create rows for the table
  const rows = tabLabels.map((label, index) => {
    return [label, tabContents[index] || document.createTextNode('')];
  });

  const tableData = [headerRow, ...rows];

  // Generate a table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table block
  element.replaceWith(block);
}