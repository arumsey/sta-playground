/* global WebImporter */
export default function parse(element, { document }) {
  // Extract logo and image section
  const pictureElement = element.querySelector('picture').cloneNode(true);

  // Extract textual links into an array of HTML elements
  const links = Array.from(element.querySelectorAll('ul li a')).map((link) => link.cloneNode(true));

  // Extract social media links into an array of HTML elements
  const socialMediaLinks = Array.from(element.querySelectorAll('div:last-of-type ul li a')).map((link) => link.cloneNode(true));

  // Extract footer text excluding redundant picture
  const footerText = element.querySelector('p:last-of-type').cloneNode(true);

  // Construct table structure without duplication of the picture element
  const headerRow = ['Columns'];
  const contentRow1 = [pictureElement, links];
  const contentRow2 = [footerText, socialMediaLinks];

  const cells = [headerRow, contentRow1, contentRow2];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}