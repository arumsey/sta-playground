/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract image from footer
  const imageElement = element.querySelector('img');

  const links = [...element.querySelectorAll('div:nth-of-type(2) ul li a')]
    .map((link) => link.outerHTML);

  // Extract additional links and content from third div
  const socialLinks = [...element.querySelectorAll('div:nth-of-type(3) ul li a')]
    .map((link) => link.outerHTML);

  // Extract text content from footer
  const footerText = element.querySelector('div:nth-of-type(2) p').textContent.trim();

  const cells = [
    headerRow,
    [imageElement, links.join('<br>')],
    [socialLinks.join('<br>'), footerText],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}