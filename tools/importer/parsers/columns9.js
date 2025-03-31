/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Correct header row

  // Extract the CTA section
  const ctaBox = element.querySelector('.nuv-three-up-static-copy__cta-box');
  const ctaTitle = ctaBox?.querySelector('.nuv-three-up-static-copy__cta-title')?.textContent?.trim();
  const ctaButton = ctaBox?.querySelector('.nuv-button__btn');

  const ctaButtonElement = document.createElement('a');
  if (ctaButton) {
    ctaButtonElement.href = ctaButton.href;
    ctaButtonElement.textContent = ctaButton.textContent.trim();
  }

  const ctaTitleElement = document.createElement('h4');
  if (ctaTitle) {
    ctaTitleElement.textContent = ctaTitle;
  }

  const ctaCellContent = [
    ctaTitleElement,
    ctaButtonElement,
  ].filter(item => item.textContent);

  // Extract the text blocks
  const textBlocks = element.querySelectorAll('.nuv-three-up-static-copy__block .nuv-three-up-static-copy__text');
  const textCells = Array.from(textBlocks).map(block => {
    const paragraph = document.createElement('p');
    paragraph.textContent = block.textContent.trim();
    return paragraph;
  });

  // Create the table
  const cells = [
    headerRow,
    ctaCellContent.concat(textCells),
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
