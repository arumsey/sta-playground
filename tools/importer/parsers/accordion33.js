/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure headers match the example accurately
  const headerRow = ['Accordion'];

  // Prepare rows to dynamically extract data and validate content
  const rows = [];

  // Locate all accordion toggler elements and their respective content
  const accordions = element.querySelectorAll('.accordions__toggler');

  if (accordions.length === 0) {
    throw new Error('No accordion toggler elements found');
  }

  accordions.forEach((toggler) => {
    const title = toggler.textContent.trim();
    const contentElement = toggler.nextElementSibling;

    if (contentElement) {
      const content = contentElement.cloneNode(true);
      rows.push([title, content]);
    } else {
      rows.push([title, 'No content available']); // Handle missing content gracefully
    }
  });

  // Extract CTA block dynamically and validate its presence
  const ctaLink = element.querySelector('a.cta-btn');

  if (ctaLink) {
    const ctaTitle = ctaLink.textContent.trim();
    const ctaHref = ctaLink.getAttribute('href');
    const ctaElement = document.createElement('a');
    ctaElement.href = ctaHref;
    ctaElement.textContent = ctaTitle;
    rows.push([document.createElement('hr'), ctaElement]);
  } else {
    rows.push([document.createElement('hr'), 'No CTA available']); // Handle missing CTA gracefully
  }

  // Ensure the header row adheres to the exact format
  const tableData = [headerRow, ...rows];

  // Create the block table using DOMUtils
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the newly created block table
  element.replaceWith(table);
}