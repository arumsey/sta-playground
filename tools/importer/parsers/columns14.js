/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the content dynamically
  const img = element.querySelector('img');
  const linksList1 = element.querySelectorAll(':scope > div:nth-child(2) ul li a');
  const email = element.querySelector(':scope > div:nth-child(2) p a');
  const socialLinks = element.querySelectorAll(':scope > div:nth-child(3) ul li a');

  // Prepare the table array
  const headerRow = ['Columns'];

  // Handle undefined elements gracefully and ensure valid content extraction
  const column1 = [
    img ? img.cloneNode(true) : '',
    document.createElement('hr'),
    ...Array.from(linksList1).map(link => link.cloneNode(true))
  ];

  const column2 = [
    email && email.href ? email.cloneNode(true) : 'No email provided',
    document.createElement('hr'),
    ...Array.from(socialLinks).map(socialLink => socialLink.cloneNode(true))
  ];

  // Organize rows
  const cells = [
    headerRow,
    column1,
    column2,
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}