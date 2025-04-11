/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all slides from carousel
  const slides = [...element.querySelectorAll('.carousel > div')];

  // Process each slide to create rows for the table
  const tableRows = slides.map(slide => {
    // Extract the image
    const imageElement = slide.querySelector('.carousel-image img');
    const image = document.createElement('img');
    image.src = imageElement.src;
    image.alt = imageElement.alt || '';

    // Extract the text content
    const textContent = slide.querySelector('.carousel-text');
    const title = textContent.querySelector('h1, h2');
    const paragraphs = [...textContent.querySelectorAll('p:not(.button-container)')].map(p => p.cloneNode(true));
    const button = textContent.querySelector('a.button');

    const textCellContent = [];
    if (title) textCellContent.push(title.cloneNode(true));
    if (paragraphs.length > 0) textCellContent.push(...paragraphs);
    if (button) textCellContent.push(button.cloneNode(true));

    // Return a single row consisting of image and text content
    return [image, textCellContent];
  });

  // Create the header row based on the example provided
  const headerRow = ['Carousel'];

  // Create the table using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);

  // Replace original element with the table block
  element.replaceWith(table);
}