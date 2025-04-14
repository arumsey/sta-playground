/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the text and paragraphs within the left column
  const textContainer = element.querySelector('.col-xs-12.col-sm-8');
  const paragraphs = textContainer ? Array.from(textContainer.querySelectorAll('p')).map(p => p.cloneNode(true)) : [];

  // Extracting the image from the right column
  const imageContainer = element.querySelector('.col-xs-12.col-sm-4 img');
  const imageElement = imageContainer ? imageContainer.cloneNode(true) : document.createElement('div'); // Create an empty div if no image exists

  // Prepare header row for the table, dynamic and matching the example
  const headerRow = ['Columns'];

  // Prepare content rows, handling edge cases for missing data
  const contentRow = [paragraphs.length > 0 ? paragraphs : '', imageElement];

  // Create the table using the helper function
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace original element with the table
  element.replaceWith(table);
}