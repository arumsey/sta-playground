/* global WebImporter */
export default function parse(element, { document }) {
  // Verify header row matches example exactly
  const headerRow = ['Columns'];

  // Extract the title
  const titleElement = element.querySelector('.nuv-retail-contacts__title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract contact information
  const contactCardElement = element.querySelector('.nuv-contact-card__info');
  const nameElement = contactCardElement ? contactCardElement.querySelector('.nuv-contact-card__name') : null;
  const name = nameElement ? nameElement.textContent.trim() : '';

  const emailElement = contactCardElement ? contactCardElement.querySelector('a[data-action="email"]') : null;
  const emailLink = emailElement ? emailElement.getAttribute('href') : '';
  const emailText = emailElement ? emailElement.textContent.trim() : '';

  // Create table cells matching the structure of the example
  const cells = [
    headerRow, // Header row
    [
      [document.createTextNode(title), document.createElement('br'), document.createTextNode(name)],
      [document.createTextNode(emailText), document.createElement('br'), document.createTextNode(emailLink)]
    ]
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}
