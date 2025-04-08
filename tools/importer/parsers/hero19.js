/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Header row
  const headerRow = ['Hero']; // Matches the example header exactly
  cells.push(headerRow);

  // Extract content from element
  const contentContainer = element.querySelector('.default-content-wrapper');

  if (!contentContainer) {
    return;
  }

  // Create heading
  const headingEl = contentContainer.querySelector('h2');
  let heading = null;
  if (headingEl) {
    heading = document.createElement('h1');
    heading.textContent = headingEl.textContent.trim(); // Dynamically extracted heading
  }

  // Create paragraphs
  const paragraphs = Array.from(contentContainer.querySelectorAll('p:not(.button-container)')).map((p) => {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = p.innerHTML.trim(); // Dynamically extracted content
    return paragraph;
  });

  // CTA - Call to Action link
  const ctaContainer = contentContainer.querySelector('.button-container a');
  let cta = null;
  if (ctaContainer) {
    cta = document.createElement('p');
    const link = document.createElement('a');
    link.href = ctaContainer.href.trim();
    link.textContent = ctaContainer.textContent.trim();
    cta.appendChild(link); // Dynamically extracted CTA
  }

  // Combine all content into the second row
  const contentRow = [
    [heading, ...paragraphs, cta].filter((item) => item !== null),
  ];

  cells.push(contentRow);

  // Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}