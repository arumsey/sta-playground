/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create an image element with src attribute from picture tag
  const createImageElement = (pictureTag) => {
    if (!pictureTag) return document.createElement('span'); // Handle missing images gracefully
    const imgElement = pictureTag.querySelector('img');
    if (!imgElement) return document.createElement('span'); // Handle missing image element
    const image = document.createElement('img');
    image.src = imgElement.src;
    image.alt = imgElement.alt || ""; // Use empty alt if none provided
    return image;
  };

  // Extract the navigation links dynamically with fallback for empty lists
  const navLinks = [];
  const navListItems = element.querySelectorAll('.nav-sections ul li a');
  if (navListItems.length) {
    navLinks.push(...Array.from(navListItems).map((link) => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.textContent || "Unknown Link"; // Fallback for empty text
      return anchor;
    }));
  } else {
    navLinks.push(document.createTextNode("No links available"));
  }

  // Extract the donate button with fallback
  const donateButton = element.querySelector('.nav-tools .button-container a');
  let donate;
  if (donateButton) {
    donate = document.createElement('a');
    donate.href = donateButton.href;
    donate.textContent = donateButton.textContent || "Donate"; // Default text fallback
  } else {
    donate = document.createTextNode("No Donate Button Found");
  }

  // Extract the brand image dynamically with fallback
  const brandImageTag = element.querySelector('.nav-brand picture');
  const brandImage = createImageElement(brandImageTag);

  // Prepare the table content dynamically populated
  const headerRow = ['Columns']; // Ensure exact header row match
  const cells = [
    headerRow,
    [brandImage, navLinks, donate],
  ];

  // Create the table block
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table block
  element.replaceWith(table);
}