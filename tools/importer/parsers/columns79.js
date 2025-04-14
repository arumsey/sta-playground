/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add block header row
  rows.push(['Columns']);

  // Function to extract content from a group
  const extractContent = (group) => {
    const titleElement = group.querySelector('h4');
    const toggles = group.querySelectorAll('.mat-slide-toggle-label span.mat-slide-toggle-content');
    const title = titleElement ? titleElement.textContent.trim() : '';

    const list = document.createElement('ul');
    toggles.forEach((toggle) => {
      const listItem = document.createElement('li');
      listItem.textContent = toggle.textContent.trim();
      list.appendChild(listItem);
    });

    const div = document.createElement('div');
    if (title) {
      const heading = document.createElement('p');
      heading.textContent = title;
      div.appendChild(heading);
    }
    div.appendChild(list);
    return div;
  };

  // Extract left, middle, and right columns
  const columns = element.querySelectorAll('.cal-column');
  const cells = [];

  columns.forEach((column) => {
    if (column.querySelector('h4') && column.querySelector('.mat-slide-toggle-label')) {
      cells.push(extractContent(column));
    }
  });

  rows.push(cells);

  // Transform into table block
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the table
  element.replaceWith(table);
}