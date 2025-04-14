/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the header row matches the example exactly with bold formatting
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Embed';

  // Dynamically extract image
  const imageElement = element.querySelector('img.sticky-cta__inner__img');
  const image = imageElement ? imageElement.cloneNode(true) : null;

  // Dynamically extract link
  const linkElement = element.querySelector('a.sticky-cta__inner__btn');
  const link = linkElement ? document.createElement('a') : null;
  if (link) {
    link.href = linkElement.href;
    link.textContent = linkElement.href;
  }

  // Combine image and link vertically in one cell
  const cellContent = [];
  if (image) cellContent.push(image);
  if (link) cellContent.push(document.createElement('br'), link);

  // Create content row with combined content in one cell
  const contentRow = [cellContent];

  // Create the table using the modified data
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new structured table
  element.replaceWith(table);
}