/* global WebImporter */
export default function parse(element, { document }) {
  // Extract relevant content from the given element
  const imageContainer = element.querySelector('.nuv-people-grid__cover-picture-container img');
  const nameLink = element.querySelector('.nuv-people-grid__name');
  const titleLink = element.querySelector('.nuv-people-grid__title');

  // Create the cells for the table
  const headerRow = ['Cards'];
  const imageCell = imageContainer ? (() => {
    const img = document.createElement('img');
    img.setAttribute('src', imageContainer.src);
    img.setAttribute('alt', imageContainer.alt || '');
    return img;
  })() : null;
  const contentCell = [];
  if (nameLink) {
    const nameHeading = document.createElement('h3');
    nameHeading.textContent = nameLink.textContent;
    contentCell.push(nameHeading);
  }
  if (titleLink) {
    const titleParagraph = document.createElement('p');
    titleParagraph.textContent = titleLink.textContent;
    contentCell.push(titleParagraph);
  }

  const cells = [
    headerRow,
    [imageCell, contentCell],
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
