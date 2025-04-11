/* global WebImporter */
export default function parse(element, { document }) {
  // Extract heading
  const title = element.querySelector('h2')?.textContent.trim() || '';

  // Extract content paragraphs, ignoring duplicates
  const paragraphs = Array.from(
    element.querySelectorAll('.default-content-wrapper > p:not(.button-container)')
  ).filter((p, index, self) => {
    return (
      self.map((para) => para.textContent.trim()).indexOf(p.textContent.trim()) === index
    );
  });

  // Extract link/button CTA
  const buttonContainer = element.querySelector('.button-container a');
  const button = buttonContainer ? document.createElement('a') : null;
  if (button) {
    button.href = buttonContainer.href;
    button.textContent = buttonContainer.textContent.trim();
  }

  // Assemble content as HTML elements
  const content = [];

  if (title) {
    const heading = document.createElement('h1');
    heading.textContent = title;
    content.push(heading);
  }

  paragraphs.forEach((p) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = p.textContent.trim();
    content.push(paragraph);
  });

  if (button) {
    content.push(button);
  }

  // Ensure proper block table structure
  const tableCells = [
    ['Hero'], // Header row matches the example
    [content],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace original element
  element.replaceWith(blockTable);
}