/* global WebImporter */
export default function parse(element, { document }) {
  const slides = Array.from(element.querySelectorAll('.carousel > div'));

  // Correct header row
  const headerRow = ['Carousel'];

  const tableRows = slides.map((slide) => {
    const imageElement = slide.querySelector('picture img');
    const image = document.createElement('img');
    image.src = imageElement.src;

    const textContainer = slide.querySelector('.carousel-text');
    const content = [];
    if (textContainer) {
      const heading = textContainer.querySelector('h1, h2');
      if (heading) {
        const headingElement = document.createElement(heading.tagName);
        headingElement.textContent = heading.textContent;
        content.push(headingElement);
      }

      const paragraphs = textContainer.querySelectorAll('p:not(.button-container)');
      paragraphs.forEach((paragraph) => {
        const pElement = document.createElement('p');
        pElement.textContent = paragraph.textContent;
        content.push(pElement);
      });

      const link = textContainer.querySelector('a');
      if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        content.push(linkElement);
      }
    }

    return [image, content];
  });

  // Create and replace with block table structure
  const block = WebImporter.DOMUtils.createTable([headerRow, ...tableRows], document);
  element.replaceWith(block);
}