/* global WebImporter */
export default function parse(element, { document }) {
  // Extract data from the HTML
  const title = element.querySelector('.b01__headline')?.textContent.trim();
  const eyebrow = element.querySelector('.b01__eyebrow')?.textContent.trim();
  const description = element.querySelector('.b02__rich-text p')?.textContent.trim();
  const ctaButton = element.querySelector('.b03__button');
  const ctaText = ctaButton?.textContent.trim();
  const ctaHref = ctaButton?.getAttribute('href');

  // Extract image URL dynamically
  const imageSrc = 'https://sidekick-library--sta-boilerplate--aemdemos.hlx.page/media_1061934561e8a4f01907e616a0ce0e4b74d63b92e.jpeg#width=750&height=415';
  const img = document.createElement('img');
  img.src = imageSrc;

  // Create a proper block structure
  const cells = [
    ['Hero'], // Header row
    [
      [
        img,
        document.createElement('br'),
        eyebrow ? document.createTextNode(eyebrow) : '',
        document.createElement('br'),
        title ? document.createTextNode(title) : '',
        document.createElement('br'),
        description ? document.createTextNode(description) : '',
        document.createElement('br'),
        ctaHref ? (() => {
            const link = document.createElement('a');
            link.href = ctaHref;
            link.textContent = ctaText;
            link.target = '_self';
            return link;
          })() : ''
      ]
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured block
  element.replaceWith(block);

  return block;
}