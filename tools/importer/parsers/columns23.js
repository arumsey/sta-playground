/* global WebImporter */
export default function parse(element, { document }) {
  // Correct header row exactly matching the example
  const headerRow = ['Columns'];

  // Extract introductory paragraphs
  const introParagraphs = Array.from(element.querySelectorAll(".default-content-wrapper p"))
    .map(p => p.textContent.trim())
    .join(" ");

  // Extract the image element
  const imageElement = element.querySelector(".default-content-wrapper picture img");
  const clonedImage = imageElement ? imageElement.cloneNode(true) : null;

  // Extract tournament details
  const tournaments = [];
  const tournamentBlocks = element.querySelectorAll(".tournament-wrapper .tournament > div");

  tournamentBlocks.forEach((block) => {
    const tournamentDetails = [];

    // Extract tournament text details
    Array.from(block.querySelectorAll("div:not(.button-container)")).forEach(detailElement => {
      tournamentDetails.push(document.createTextNode(detailElement.textContent.trim()));
    });

    // Extract email link if exists
    const linkElement = block.querySelector("div.button-container a");
    if (linkElement) {
      tournamentDetails.push(linkElement.cloneNode(true));
    }

    tournaments.push(tournamentDetails);
  });

  // Build the table data (header row with exactly one column)
  const tableData = [
    headerRow, // Correct header row
    [
      document.createTextNode(introParagraphs),
      clonedImage,
    ],
    ...tournaments, // Add tournament rows
  ];

  // Create the structured block table
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element with constructed block table
  element.replaceWith(blockTable);
}