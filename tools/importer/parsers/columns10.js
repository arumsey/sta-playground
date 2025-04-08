/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const brandLogo = element.querySelector('div.nav-brand picture img');
  const brandImage = document.createElement('img');
  brandImage.src = brandLogo?.src || '';
  brandImage.alt = brandLogo?.alt || '';
  brandImage.width = brandLogo?.width || 0;
  brandImage.height = brandLogo?.height || 0;

  const navLinks = Array.from(element.querySelectorAll('div.nav-sections ul li a')).map((link) => {
    const anchor = document.createElement('a');
    anchor.href = link.href;
    anchor.textContent = link.textContent;
    return anchor;
  });

  const donateButtonLink = element.querySelector('div.nav-tools a');
  const donateButton = document.createElement('a');
  donateButton.href = donateButtonLink?.href || '#';
  donateButton.textContent = donateButtonLink?.textContent || 'Donate';
  donateButton.className = donateButtonLink?.className || '';

  const tableCells = [
    headerRow, // Header row
    [brandImage, navLinks], // Content row
    [donateButton], // Last row with single Donate button
  ];

  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}