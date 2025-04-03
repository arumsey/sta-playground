/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the required elements from the input element
  const titleElement = element.querySelector('.b02__rich-text p');
  const title = titleElement ? titleElement.textContent.trim() : '';

  const ctaElement = element.querySelector('.b03__button');
  let ctaText = '';
  let ctaLink = '';
  if (ctaElement) {
    ctaText = ctaElement.textContent.trim();
    ctaLink = ctaElement.getAttribute('href');
  }

  // Prepare the table content
  const headerRow = ['Hero'];
  const contentRow = [];

  // Combine title and CTA into a single cell
  const content = [];

  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title;
    content.push(heading);
  }

  if (ctaText && ctaLink) {
    const link = document.createElement('a');
    link.href = ctaLink;
    link.textContent = ctaText;
    content.push(link);
  }

  contentRow.push(content);

  // Create the block table
  const cells = [
    headerRow,
    contentRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(blockTable);
}