/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract logo section
  const navBrand = element.querySelector('.nav-brand');
  const logoImg = navBrand ? navBrand.querySelector('img') : null;
  const logo = document.createElement('div');
  if (logoImg) {
    logo.appendChild(logoImg.cloneNode(true));
  }

  // Extract nav sections links
  const navSections = element.querySelector('.nav-sections ul');
  const links = navSections 
    ? Array.from(navSections.querySelectorAll('a')).map((link) => {
        const li = document.createElement('li');
        li.textContent = link.textContent;
        return li;
      })
    : [];
  const list = document.createElement('ul');
  list.append(...links);

  // Create 'Live' link dynamically
  const liveLink = document.createElement('a');
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  liveLink.textContent = 'Live';

  // Extract donate button
  const donateSection = element.querySelector('.nav-tools a.button');
  const donateButton = document.createElement('div');
  if (donateSection) {
    donateButton.appendChild(donateSection.cloneNode(true));
  }

  // Create table structure
  const cells = [
    headerRow,
    [list, logo],
    [donateButton, liveLink],
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}