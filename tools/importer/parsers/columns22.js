/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const slides = element.querySelectorAll('.ct06__slide-content'); // Retrieve all slide content
  const rowCells = [];

  slides.forEach((slide) => {
    const imgElement = slide.querySelector('picture source:last-of-type');
    const imgSrc = imgElement ? imgElement.srcset : null;

    if (imgSrc) {
      const image = document.createElement('img');
      image.src = imgSrc;
      rowCells.push([image]);
    }
  });

  // Create the table
  const cells = [
    headerRow,
    ...rowCells
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}