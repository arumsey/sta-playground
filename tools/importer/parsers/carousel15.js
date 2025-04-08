/* global WebImporter */
export default function parse(element, { document }) {
  const carouselSlides = Array.from(element.querySelectorAll('.carousel > div'));

  const rows = [
    ['Carousel'],
  ];

  carouselSlides.forEach((slide) => {
    const imageEl = slide.querySelector('picture img');
    const img = document.createElement('img');
    img.src = imageEl.src;
    img.alt = imageEl.alt || 'Image description not available'; // Provide a fallback alt text

    const textContainer = slide.querySelector('.carousel-text');
    const headingEl = textContainer?.querySelector('h1, h2');
    const heading = headingEl ? document.createElement(headingEl.tagName) : null;
    if (heading) heading.textContent = headingEl.textContent;

    const paragraphs = Array.from(textContainer.querySelectorAll('p')).map(p => {
      const paragraph = document.createElement('p');
      paragraph.textContent = p.textContent;
      return paragraph;
    });

    const linkEl = textContainer.querySelector('a');
    const link = linkEl ? document.createElement('a') : null;
    if (link) {
      link.href = linkEl.href;
      link.textContent = linkEl.textContent;

      // Remove duplicate 'LEARN MORE' paragraph if a link exists
      paragraphs.forEach((para, index) => {
        if (para.textContent === linkEl.textContent) {
          paragraphs.splice(index, 1);
        }
      });
    }

    const content = [heading, ...paragraphs];
    if (link) content.push(link);

    rows.push([
      img,
      content,
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}