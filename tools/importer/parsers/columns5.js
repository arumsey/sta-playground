/* global WebImporter */

export default function parse(element, { document }) {
  const cells = [];

  // Add the header row as specified in the example layout.
  cells.push(['Columns']);

  // Safely extract navigation brand image.
  const navBrandElement = element.querySelector('.nav-brand picture img');
  let navBrandImage = '';
  if (navBrandElement) {
    navBrandImage = document.createElement('img');
    navBrandImage.src = navBrandElement.getAttribute('src');
    navBrandImage.alt = navBrandElement.getAttribute('alt') || '';
  }

  // Extract navigation links.
  const navSections = element.querySelector('.nav-sections ul');
  const navLinks = [];
  if (navSections) {
    navSections.querySelectorAll('li').forEach((li) => {
      const link = li.querySelector('a');
      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.getAttribute('href');
        anchor.textContent = link.textContent.trim();

        const listItem = document.createElement('li');
        listItem.appendChild(anchor);
        navLinks.push(listItem);
      }
    });
  }

  const navList = document.createElement('ul');
  navLinks.forEach((link) => {
    navList.appendChild(link);
  });

  // Safely extract Donate Button.
  const donateButtonElement = element.querySelector('.nav-tools .button-container a');
  let donateButton = '';
  if (donateButtonElement) {
    donateButton = document.createElement('a');
    donateButton.href = donateButtonElement.getAttribute('href');
    donateButton.textContent = donateButtonElement.textContent.trim();
  }

  // Create the rows of the table.
  cells.push([navList, navBrandImage]);
  cells.push([donateButton]);

  // Generate the table using the helper.
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table.
  element.replaceWith(blockTable);
}