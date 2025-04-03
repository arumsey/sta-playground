/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const headingElement = element.querySelector('h1.c01__headline');
  const heading = headingElement ? (() => {
    const h = document.createElement('h1');
    h.textContent = headingElement.textContent.trim();
    return h;
  })() : null;

  // Extract the subheading
  const subheadingElement = element.querySelector('p.c01__subtitle');
  const subheading = subheadingElement ? (() => {
    const p = document.createElement('p');
    p.textContent = subheadingElement.textContent.trim();
    return p;
  })() : null;

  // Extract the call-to-action link
  const ctaElement = element.querySelector('a.b03__button');
  let cta = null;
  if (ctaElement) {
    const ctaLink = document.createElement('a');
    ctaLink.href = ctaElement.href;
    ctaLink.textContent = ctaElement.textContent.trim();
    cta = ctaLink;
  }

  // Create the table structure
  const headerRow = ['Hero'];

  const contentRow = [[heading, subheading, cta].filter(Boolean)]; // Ensure no null entries

  const tableData = [headerRow, ...contentRow];

  // Use WebImporter.DOMUtils.createTable to create the table
  const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the table
  element.replaceWith(tableBlock);
}