/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [];

  // Correctly defining the header row, ensuring exact match with the example
  const headerRow = ['Accordion'];
  rows.push(headerRow);

  // Extracting tab panes dynamically
  const tabPanes = element.querySelectorAll('.tab-pane');

  tabPanes.forEach((tabPane) => {
    const teaserBlocks = tabPane.querySelectorAll('.teasers__teaser');

    teaserBlocks.forEach((teaser) => {
      const titles = teaser.querySelectorAll('h5');
      const paragraphs = teaser.querySelectorAll('p');
      const links = teaser.querySelectorAll('a');

      titles.forEach((title, index) => {
        const titleCell = title.textContent.trim(); // Extract plain text titles dynamically

        const contentCell = [];

        // Add paragraphs to content cell if valid
        if (paragraphs[index] && paragraphs[index].textContent.trim()) {
          contentCell.push(paragraphs[index].cloneNode(true));
        }

        // Add links to content cell if valid
        if (links[index]) {
          contentCell.push(links[index].cloneNode(true));
        }

        // Only add rows with valid content
        if (titleCell && contentCell.length > 0) {
          rows.push([titleCell, contentCell]);
        }
      });
    });
  });

  // Creating the table block ensuring no empty rows or invalid content
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block structure
  element.replaceWith(table);
}