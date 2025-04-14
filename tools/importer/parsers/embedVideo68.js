/* global WebImporter */
export default function parse(element, { document }) {
  const img = element.querySelector('img');
  const heading = element.querySelector('.sticky-cta__inner__text h5');
  const paragraph = element.querySelector('.sticky-cta__inner__text p');
  const link = element.querySelector('a');

  // Handle edge cases for missing elements
  const imageElement = img ? img.cloneNode(true) : document.createTextNode('');
  const headingText = heading ? heading.textContent.trim() : '';
  const paragraphText = paragraph ? paragraph.textContent.trim() : '';
  const linkElement = link ? link.cloneNode(true) : document.createTextNode('');

  // Final table structure
  const headerRow = ['Sticky-CTA'];
  const contentRow = [
    [
      imageElement,
      document.createElement('hr'),
      headingText,
      paragraphText,
      linkElement
    ]
  ];

  const cells = [headerRow, contentRow];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}