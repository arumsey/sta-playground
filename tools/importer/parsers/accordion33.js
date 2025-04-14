/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract content
  const getTextContent = (el) => (el ? el.textContent.trim() : '');

  const headerRow = ['Accordion'];

  const rows = [];

  // Extract the title
  const title = element.querySelector('h2:not([id])');
  const titleText = getTextContent(title);

  if (!titleText) return;

  const accordionContent = element.querySelector('.accordions__element');

  if (accordionContent) {
    const paragraphs = Array.from(accordionContent.querySelectorAll('p'));

    paragraphs.forEach((paragraph) => {
      const clonedParagraph = paragraph.cloneNode(true);
      rows.push([
        titleText,
        clonedParagraph
      ]);
    });
  }

  // Append final button cell
  const buttonWrapper = element.querySelector('.col-xs-12.text-center a');
  if (buttonWrapper) {
    rows.push([
      '',
      buttonWrapper.cloneNode(true),
    ]);
  }

  // Create final table output
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}