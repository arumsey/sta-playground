/* global WebImporter */
export default function parse(element, { document }) {
  // Extract unique logos from the provided HTML
  const logosSet = new Map(); // Use a Map to ensure uniqueness based on the src attribute

  Array.from(element.querySelectorAll('.logos > div')).forEach((logoElement) => {
    const img = logoElement.querySelector('picture img');
    if (img) {
      const src = img.src;
      if (!logosSet.has(src)) {
        const logoData = {
          src,
          alt: img.alt || '',
          width: img.width,
          height: img.height,
        };
        logosSet.set(src, logoData); // Store unique logos using src as the key
      }
    }
  });

  // Convert unique logos into DOM elements
  const logos = Array.from(logosSet.values()).map(({ src, alt, width, height }) => {
    const extractedImg = document.createElement('img');
    extractedImg.setAttribute('src', src);
    extractedImg.setAttribute('alt', alt);
    extractedImg.setAttribute('width', width);
    extractedImg.setAttribute('height', height);
    return extractedImg;
  });

  // Construct table rows for the carousel block based on deduplicated content
  const headerRow = ['Carousel'];
  const rows = logos.map((logo) => [logo]);
  const cells = [headerRow, ...rows];

  // Generate the block using WebImporter.DOMUtils.createTable
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the input element with the created block
  element.replaceWith(block);
}