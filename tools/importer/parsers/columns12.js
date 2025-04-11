/* global WebImporter */

export default function parse(element, { document }) {
  // Validate input
  if (!element || !document) {
    console.error('Invalid input parameters.');
    return;
  }

  // Extract the logo image
  const logoPicture = element.querySelector('div:nth-of-type(1) picture');
  const logoImage = logoPicture?.querySelector('img');

  // Extract the first column (links, email, copyright)
  const linksContainer = element.querySelector('div:nth-of-type(2)');
  const linksList = linksContainer?.querySelector('ul');
  const emailText = linksContainer?.querySelector('p');

  // Extract the second column (social media links)
  const socialLinksContainer = element.querySelector('div:nth-of-type(3) ul');

  // Check edge cases (empty or missing data)
  const cells = [
    ['Columns'], // Header row
    [
      logoImage ? [logoImage] : [''], // Logo column
      linksList || emailText ? [linksList, emailText] : [''], // Links column
      socialLinksContainer ? [socialLinksContainer] : [''], // Social links column
    ],
  ];

  // Validate every row and cell before creating the table
  if (!cells.every(row => Array.isArray(row) && row.length >= 1)) {
    console.error('Invalid table structure.');
    return;
  }

  // Replace original element with structured block table
  try {
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
  } catch (error) {
    console.error('Error creating or replacing block table:', error);
  }
}