/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header exactly matches the example
  const headerRow = ['Columns'];

  // Dynamically extract the image with its attributes
  const image = element.querySelector('img');
  const imageElement = document.createElement('img');
  imageElement.src = image ? image.src : '';
  imageElement.alt = image ? image.alt : '';

  // Dynamically extract the caption if it exists
  const caption = document.createElement('em');
  caption.textContent = image && image.nextElementSibling ? image.nextElementSibling.textContent.trim() : '';

  const imageContent = image ? [imageElement, caption] : [];

  // Extract the text content dynamically and preserve its formatting
  const textArea = element.querySelector('.teasers__teaser');

  const textContent = document.createElement('div');
  textContent.innerHTML = textArea ? textArea.innerHTML : '';

  // Prepare the cells structure dynamically
  const cells = [
    headerRow,
    [imageContent, textContent],
  ];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}