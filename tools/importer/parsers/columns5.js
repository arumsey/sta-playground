/* global WebImporter */
export default function parse(element, { document }) {
  // Declare header row dynamically as per the example
  const headerRow = ["Columns block"];

  // Extract logo dynamically from the "nav-brand" section
  const logoAnchor = element.querySelector(".nav-brand a");
  const logo = logoAnchor ? logoAnchor.querySelector("img") : null;
  const logoElement = document.createElement("div");
  if (logo) {
    const clonedLogo = logo.cloneNode(true);
    logoElement.appendChild(clonedLogo);
  }

  // Extract navigation links dynamically from the "nav-sections" section
  const navLinks = element.querySelectorAll(".nav-sections ul li a");
  const navLinkElements = Array.from(navLinks).map((link) => {
    const clonedLink = document.createElement("p");
    clonedLink.appendChild(link.cloneNode(true));
    return clonedLink;
  });
  const navList = document.createElement("div");
  navList.append(...navLinkElements);

  // Extract the donate button dynamically from the "nav-tools" section
  const donateButton = element.querySelector(".nav-tools a.button.primary");
  const donateElement = document.createElement("div");
  if (donateButton) {
    const clonedButton = donateButton.cloneNode(true);
    donateElement.appendChild(clonedButton);
  }

  // MUST dynamically extract data, no hardcoding!

  // Create structured block table using the helper function
  const cells = [
    headerRow, // Matches example header row exactly
    [logoElement, navList, donateElement],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with the newly structured table
  element.replaceWith(blockTable);
}