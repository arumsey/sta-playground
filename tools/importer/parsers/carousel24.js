/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Carousel'];

  // Select all unique slide divs inside the logos wrapper (ignore duplicates with 'loading="lazy"')
  const slides = Array.from(element.querySelectorAll('.logos > div'))
    .filter((slide, index, self) => {
      const img = slide.querySelector('img');
      return img && self.findIndex(s => s.querySelector('img')?.src === img.src) === index;
    });

  // Create rows by processing each slide
  const rows = slides.map((slide) => {
    const imageWrapper = slide.querySelector('img');
    const image = imageWrapper && imageWrapper.cloneNode(true);

    // Ensure there is content to process
    if (!image) {
      return ['']; // Empty row if image is missing
    }

    // Create the row with image only, no text
    return [image];
  }).filter((row) => row[0]); // Filter out rows that might be empty

  const cells = [headerRow, ...rows];

  // Create the table using the helper function
  const carouselBlock = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block
  element.replaceWith(carouselBlock);
}