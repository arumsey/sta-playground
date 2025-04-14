/* global WebImporter */
export default function parse(element, { document }) {
  // Creating header row
  const headerRow = ['Columns']; // Matches example exactly

  // Extracting content
  const contentCells = Array.from(element.querySelectorAll('.icon-and-text__link')).map(link => {
    const image = link.querySelector('img');
    const title = link.querySelector('.icon-and-text__text');

    const imageElement = document.createElement('img');
    imageElement.src = image.src;

    const titleElement = document.createElement('p');
    titleElement.textContent = title.textContent.trim(); // Ensure proper formatting

    const wrapper = document.createElement('div'); // Using a div to wrap image and text
    wrapper.appendChild(imageElement);
    wrapper.appendChild(titleElement);

    return wrapper; // Properly structured cell content within div
  });

  // Creating cells array
  const cells = [
    headerRow, // Header row as a single cell
    contentCells // Second row for content
  ];

  // Creating block and replacing element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}