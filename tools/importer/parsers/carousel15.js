/* global WebImporter */
export default function parse(element, { document }) {
  const slides = Array.from(element.querySelectorAll('.carousel > div'));

  const cells = [];
  const headerRow = ['Carousel'];
  cells.push(headerRow);

  slides.forEach((slide) => {
    const imageElement = slide.querySelector('.carousel-image picture img');
    const img = document.createElement('img');
    img.src = imageElement.src;
    img.alt = imageElement.alt;

    const textContainer = slide.querySelector('.carousel-text');
    const textContents = [];

    if (textContainer) {
      const heading = textContainer.querySelector('h1, h2');
      if (heading) textContents.push(heading);

      const paragraphs = Array.from(textContainer.querySelectorAll('p')).filter(p => !p.classList.contains('button-container'));
      paragraphs.forEach((p) => textContents.push(p));

      const button = textContainer.querySelector('.button-container a');
      if (button) textContents.push(button);
    }

    cells.push([img, textContents]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}