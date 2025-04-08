/* global WebImporter */
export default function parse(element, { document }) {
  // Correcting headers to match example and verifying code structure
  const headerRow = ['Columns'];

  // Extract the logo from the nav-brand section dynamically
  const logo = element.querySelector('.nav-brand img');
  const logoElement = logo ? document.createElement('img') : null;
  if (logoElement) {
    logoElement.src = logo.src;
    logoElement.alt = logo.alt;
  }

  // Extract navigation links from the nav-sections section dynamically
  const navLinks = Array.from(element.querySelectorAll('.nav-sections a')).map(navLink => {
    const linkElement = document.createElement('a');
    linkElement.href = navLink.href;
    linkElement.textContent = navLink.textContent.trim();
    return linkElement;
  });

  // Handle edge case when nav-sections or links are missing
  const navLinksCell = navLinks.length ? navLinks : ['No links available'];

  // Extract donate button text and link dynamically
  const donateButton = element.querySelector('.nav-tools a');
  const donateElement = donateButton ? document.createElement('a') : null;
  if (donateElement) {
    donateElement.href = donateButton.href;
    donateElement.textContent = donateButton.textContent.trim();
  }

  // Define donate cell placeholder if missing
  const donateCell = donateElement ? [donateElement] : ['No donate option available'];

  // Structure data into rows and columns
  const tableData = [
    headerRow,
    [logoElement, navLinksCell],
    donateCell
  ].filter(row => row.every(cell => cell)); // Ensuring valid rows

  // Create table block
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}