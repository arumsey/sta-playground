/* global WebImporter */
export default function parse(element, { document }) {
  // Extracting the header
  const headerRow = ['Columns'];

  // Extracting content from the element dynamically
  const navBrandImage = element.querySelector('.nav-brand img');
  const navSectionsLinks = element.querySelectorAll('.nav-sections ul li a');
  const donateButton = element.querySelector('.nav-tools .button-container a');

  // Handle edge cases
  const navImage = navBrandImage ? navBrandImage.cloneNode(true) : document.createTextNode('');

  const sections = navSectionsLinks.length
    ? Array.from(navSectionsLinks).map((link) => {
        const sectionContainer = document.createElement('div');
        const hr = document.createElement('hr');
        sectionContainer.append(hr, link.cloneNode(true));
        return sectionContainer;
      })
    : [document.createTextNode('No sections available')];

  const donateElement = donateButton ? donateButton.cloneNode(true) : document.createTextNode('No Donate button');

  // Create table cells structure
  const cells = [
    headerRow, // Header row matches example exactly
    [
      navImage,
      sections, // Navigation sections dynamically extracted
      donateElement, // Donate button dynamically extracted
    ],
  ];

  // Create structured table block using WebImporter.DOMUtils
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with new structured table block
  element.replaceWith(block);
}