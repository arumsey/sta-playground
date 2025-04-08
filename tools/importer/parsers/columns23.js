/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Extract title dynamically
  const title = element.querySelector('h2')?.textContent.trim();

  // Step 2: Extract image dynamically from the <picture> tag
  const image = element.querySelector('picture img')?.cloneNode(true);

  // Step 3: Extract paragraph elements dynamically
  const paragraphs = Array.from(element.querySelectorAll('.default-content-wrapper p')).map(p => {
    const clonedParagraph = p.cloneNode(true);
    // Remove the <picture> tag contents to avoid duplication
    const picture = clonedParagraph.querySelector('picture');
    if (picture) {
      picture.remove();
    }
    return clonedParagraph;
  });

  // Step 4: Extract tournament details dynamically
  const tournaments = Array.from(element.querySelectorAll('.tournament-wrapper .tournament > div')).map(tournament => {
    const details = Array.from(tournament.children).map(child => child.cloneNode(true));
    return details;
  });

  // Table creation updated to match example precisely
  const headerRow = ['Columns'];

  const contentRows = [
    [
      [title, image, ...paragraphs], // First column with extracted title, image, and paragraph content
      tournaments.map(details => {
        const wrapper = document.createElement('div');
        wrapper.append(...details);
        return wrapper;
      }) // Second column with tournament information
    ]
  ];

  const table = WebImporter.DOMUtils.createTable([headerRow, ...contentRows], document);

  // Replace the original element with the table
  element.replaceWith(table);
}