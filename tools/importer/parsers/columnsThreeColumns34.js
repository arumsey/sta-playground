/* global WebImporter */

export default function parse(element, { document }) {
  // Define the header row for the table, matching the example given
  const headerRow = ['Capabilities'];

  // Locate columns in the HTML and extract their content dynamically
  const columnElements = element.querySelectorAll('.ct01__column');

  const contentCells = Array.from(columnElements).map((column) => {
    const richTextBlocks = column.querySelectorAll('.b02__rich-text');
    const content = [];

    richTextBlocks.forEach((block) => {
      const titleElement = block.querySelector('h5');
      const paragraphElement = block.querySelector('p');

      if (titleElement) {
        const title = document.createElement('h5');
        title.textContent = titleElement.textContent; // Extract plain text
        content.push(title);
      }

      if (paragraphElement) {
        const paragraph = document.createElement('p');
        paragraph.textContent = paragraphElement.textContent; // Extract plain text
        content.push(paragraph);
      }
    });

    return content;
  });

  // If any columns are missing, fill them with empty placeholders for alignment
  while (contentCells.length < 3) {
    contentCells.push([document.createElement('p')]); // Add empty paragraph
  }

  // Create the table using WebImporter.DOMUtils.createTable()
  const table = WebImporter.DOMUtils.createTable([
    headerRow,      // Header row, matching the example explicitly
    ...contentCells // Content rows, extracted dynamically and aligned properly
  ], document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}