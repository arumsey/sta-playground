/* global WebImporter */

export default function parse(element, { document }) {
  // Header row for the table
  const headerRow = ["Columns"];

  // Extracting dynamic content
  const logo = element.querySelector(".nav-brand picture img");
  const menuContainer = element.querySelector(".nav-sections ul");
  const menuLinks = menuContainer ? Array.from(menuContainer.querySelectorAll("a")) : [];
  const donateButton = element.querySelector(".nav-tools .button.primary");

  // Handling missing elements and creating table structure
  const cells = [
    headerRow, // Block type header
    [
      logo ? logo.cloneNode(true) : document.createTextNode(""), // Ensure logo is cloned or fallback to empty cell
      menuLinks.length > 0 ? menuLinks.map(link => link.cloneNode(true)) : document.createTextNode(""), // Clone menu links or provide empty cell
      donateButton ? donateButton.cloneNode(true) : document.createTextNode(""), // Clone donate button or fallback to empty cell
    ],
  ];

  // Create table using WebImporter helper
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the new table
  element.replaceWith(blockTable);
}