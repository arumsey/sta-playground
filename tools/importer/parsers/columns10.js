/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Correct header row as per example

  // Extracting the brand image dynamically
  const imageWrapper = element.querySelector('.nav-brand picture img');
  const image = document.createElement('img');
  if (imageWrapper) {
    image.src = imageWrapper.src;
    image.alt = imageWrapper.alt || ''; // Include alt text if available, default to empty
  } else {
    image.textContent = 'Image not found'; // Handle missing image case
  }

  // Extracting nav links dynamically
  const navLinks = element.querySelectorAll('.nav-sections a');
  const linksList = document.createElement('ul');
  if (navLinks && navLinks.length > 0) {
    navLinks.forEach((link) => {
      const listItem = document.createElement('li');
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent;
      listItem.appendChild(anchor);
      linksList.appendChild(listItem);
    });
  } else {
    const noLinksMessage = document.createElement('p');
    noLinksMessage.textContent = 'No links found';
    linksList.appendChild(noLinksMessage); // Handle missing links case
  }

  // Extracting the donate button dynamically
  const donateButtonWrapper = element.querySelector('.nav-tools a.button');
  const donateButton = document.createElement('a');
  if (donateButtonWrapper) {
    donateButton.href = donateButtonWrapper.href;
    donateButton.textContent = donateButtonWrapper.textContent;
    donateButton.className = donateButtonWrapper.className;
  } else {
    donateButton.textContent = 'Donate button not found'; // Handle missing donate button case
  }

  // Combine extracted data into cells
  const cells = [
    headerRow,
    [image, linksList, donateButton],
  ];

  // Create block using WebImporter.DOMUtils
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(block);
}