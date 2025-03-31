/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create a paragraph dynamically
  const createParagraph = (text) => {
    const p = document.createElement('p');
    p.textContent = text.trim();
    return p;
  };

  // Extract relevant content dynamically
  const imageElement = element.querySelector('.nuv-image-callout-breaker__img');
  const imageSrc = imageElement?.src || '';
  const imageAlt = imageElement?.alt || '';

  const headlineElement = element.querySelector('.nuv-image-callout-breaker__headline');
  const headlineText = headlineElement?.textContent.trim() || '';

  const buttonElement = element.querySelector('a.nuv-button__btn');
  const buttonHref = buttonElement?.href || '';
  const buttonText = buttonElement?.textContent.trim() || '';

  // Create structured image element
  const structuredImage = document.createElement('img');
  structuredImage.src = imageSrc;
  structuredImage.alt = imageAlt;

  // Table header must exactly match the given example "Columns"
  const headerRow = ['Columns'];

  // Table content row
  const contentRow = [
    structuredImage,
    createParagraph(headlineText),
    createParagraph(buttonText)
  ];

  const tableData = [
    headerRow,
    contentRow
  ];

  // Create block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with the generated block table
  element.replaceWith(blockTable);
}
