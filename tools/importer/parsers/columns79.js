/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ["Columns"]; // Correctly matches the example header

  const contentRows = [];

  // Extract content sections dynamically
  const sections = element.querySelectorAll(".cal-column.cal-column--lg-30");
  sections.forEach((section) => {
    const heading = section.querySelector("h4")?.textContent.trim() || ""; // Handle missing headings

    const toggles = section.querySelectorAll("mat-slide-toggle");
    const toggleContents = Array.from(toggles).map((toggle) => {
      const label = toggle.querySelector(".mat-slide-toggle-content");
      return label?.textContent.trim() || ""; // Handle missing toggle content
    });

    // Create content for each column dynamically
    const contentCell = document.createElement("div");
    contentCell.innerHTML = `<strong>${heading}</strong><ul>${toggleContents.map(content => `<li>${content}</li>`).join("")}</ul>`;

    contentRows.push([contentCell]); // Ensure proper format for each row with content cells in arrays
  });

  // Create the table block dynamically
  const cells = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element safely
  element.replaceWith(block);
}