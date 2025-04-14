/* global WebImporter */
export default function parse(element, { document }) {
  const cards = [];

  // Header row
  const headerRow = ['Cards'];
  cards.push(headerRow);

  // Extract card elements
  const cardElements = element.querySelectorAll('div.anchor.col-sm-6.col-md-4');

  cardElements.forEach((cardEl) => {
    const imageEl = cardEl.querySelector('.panel__image');
    const titleEl = cardEl.querySelector('.panel__headline');
    const ctaEl = cardEl.querySelector('.cta-btn');

    const imageUrl = imageEl.style.backgroundImage;
    const imageSrc = imageUrl.match(/url\(['"]?(.*?)['"]?\)/)[1];

    const image = document.createElement('img');
    image.src = imageSrc;
    image.alt = titleEl ? titleEl.textContent.trim() : '';

    const textContent = [];

    if (titleEl) {
      const title = document.createElement('strong');
      title.textContent = titleEl.textContent.trim();
      textContent.push(title);
      textContent.push(document.createElement('br'));
    }

    if (ctaEl) {
      const cta = document.createElement('a');
      cta.href = cardEl.querySelector('a.panel').href;
      cta.textContent = ctaEl.textContent.trim();
      textContent.push(cta);
    }

    cards.push([image, textContent]);
  });

  const block = WebImporter.DOMUtils.createTable(cards, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}