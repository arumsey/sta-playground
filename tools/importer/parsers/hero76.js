/* global WebImporter */

export default function parse(element, { document }) {
  // Extract content
  const heading = element.querySelector('.teasers__teaser h2')?.textContent.trim() || '';
  const paragraph = element.querySelector('.teasers__teaser p') || '';
  const link = element.querySelector('.panel__links a') || '';
  const images = element.querySelectorAll('img');

  // Create header row
  const headerRow = ['Hero'];

  // Construct content row
  const content = [];

  // Add heading
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.textContent = heading;
    content.push(headingElement);
  }

  // Add paragraph
  if (paragraph) {
    content.push(paragraph.cloneNode(true));
  }

  // Add link
  if (link) {
    const linkElement = document.createElement('a');
    linkElement.href = link.href;
    linkElement.textContent = link.textContent.trim();
    content.push(linkElement);
  }

  // Add images
  images.forEach((img) => {
    const imageElement = document.createElement('img');
    imageElement.src = img.src;
    imageElement.alt = img.alt;
    content.push(imageElement);
  });

  // Create table
  const tableCells = [
    headerRow,
    [content] // Single column with all content
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(blockTable);
}