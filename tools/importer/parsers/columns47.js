/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row to match the example
  const headerRow = ['Columns'];

  // Extract content from the text column
  const textColumnContent = element.querySelector('.col-sm-8');
  let textCellContent;
  if (textColumnContent) {
    const textElements = [...textColumnContent.querySelectorAll('p, a')];
    textCellContent = textElements.length > 0 ? textElements : ['No content available'];
  } else {
    textCellContent = ['No content available']; // Default if no text content exists
  }

  // Extract content from the image column
  const imageColumnContent = element.querySelector('.col-sm-4');
  let imageCellContent;
  if (imageColumnContent) {
    const img = imageColumnContent.querySelector('img');
    imageCellContent = img ? [img] : ['No image available'];
  } else {
    imageCellContent = ['No image available']; // Default if no image exists
  }

  // Build the cells array for the table
  const cells = [
    headerRow,
    [textCellContent, imageCellContent]
  ];

  // Generate the block table using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created block table
  element.replaceWith(block);
}