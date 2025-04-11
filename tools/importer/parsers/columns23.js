/* global WebImporter */
export default function parse(element, { document }) {
  // Declare header row matching the example with <strong> wrapping the text
  const headerRow = [document.createElement('strong')];
  headerRow[0].textContent = 'Columns';

  // Initialize content array for structured layout
  const cells = [headerRow];

  // Extract main content block dynamically
  const tournamentContainer = element.querySelector('.default-content-wrapper');
  if (tournamentContainer) {
    const contentColumns = [];

    // Left content: heading & description paragraphs
    const leftContent = document.createElement('div');
    const heading = tournamentContainer.querySelector('h2');
    const paragraphs = tournamentContainer.querySelectorAll('p');
    
    if (heading) leftContent.append(heading.cloneNode(true));
    paragraphs.forEach(p => leftContent.append(p.cloneNode(true)));

    // Right content: image
    const rightContent = document.createElement('div');
    const image = tournamentContainer.querySelector('img');
    if (image) rightContent.append(image.cloneNode(true));

    contentColumns.push(leftContent, rightContent);
    cells.push(contentColumns); // Add as a row to the table
  }

  // Extract tournament blocks dynamically
  const tournaments = element.querySelector('.tournament-wrapper');
  if (tournaments) {
    const tournamentBlocks = tournaments.querySelectorAll('.tournament > div');

    tournamentBlocks.forEach(block => {
      const tournamentContent = [];

      const eventName = block.children[0];
      const location = block.children[1];
      const date = block.children[2];
      const button = block.querySelector('.button-container a');

      const details = document.createElement('div');
      if (eventName) details.append(eventName.cloneNode(true));
      if (location) details.append(location.cloneNode(true));
      if (date) details.append(date.cloneNode(true));
      if (button) details.append(button.cloneNode(true));

      tournamentContent.push(details);
      cells.push(tournamentContent); // Add details as a row to the table
    });
  }

  // Create the structured block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}