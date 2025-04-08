/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from input element
  const title = element.querySelector('h2');
  const mainPicture = element.querySelector('picture img');
  const paragraphs = element.querySelectorAll('.default-content-wrapper p');
  const tournaments = element.querySelectorAll('.tournament-wrapper .tournament > div');

  const headerRow = ['Columns block']; // Header row matches example

  const firstColumnContent = document.createElement('div');
  if (title) firstColumnContent.appendChild(title.cloneNode(true));
  if (mainPicture) firstColumnContent.appendChild(mainPicture.cloneNode(true));
  paragraphs.forEach(p => firstColumnContent.appendChild(p.cloneNode(true)));

  const secondColumnContent = document.createElement('div');
  tournaments.forEach(tournament => {
    const details = tournament.querySelectorAll('div');
    details.forEach(detail => secondColumnContent.appendChild(detail.cloneNode(true)));
  });

  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent]
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}