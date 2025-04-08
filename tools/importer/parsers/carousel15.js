/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add the header row with correct structure
  rows.push(['Carousel']); // Simple header as defined in the example

  // Process each carousel slide
  const slides = element.querySelectorAll('.carousel > div');
  slides.forEach((slide) => {
    const imageElement = slide.querySelector('img');
    const image = imageElement ? document.createElement('img') : null;
    if (image) {
      image.src = imageElement.src;
      image.alt = imageElement.alt || '';
    }

    const textContainer = slide.querySelector('.carousel-text');
    const textContent = [];
    if (textContainer) {
      const title = textContainer.querySelector('h1, h2');
      const paragraphs = textContainer.querySelectorAll('p');
      const link = textContainer.querySelector('a');

      if (title) {
        const heading = document.createElement(title.tagName);
        heading.textContent = title.textContent;
        textContent.push(heading);
      }

      paragraphs.forEach((p) => {
        if (!p.querySelector('a')) { // Ignore paragraphs containing links
          const paragraph = document.createElement('p');
          paragraph.textContent = p.textContent;
          textContent.push(paragraph);
        }
      });

      if (link) {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent;
        textContent.push(anchor);
      }
    }

    rows.push([image, textContent]);
  });

  // Create and replace with the structured table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}