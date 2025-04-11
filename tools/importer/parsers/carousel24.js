/* global WebImporter */
 export default function parse(element, { document }) {
  const headerRow = ['Carousel'];

  const rows = Array.from(element.querySelectorAll('.logos > div'))
    .filter(div => div.querySelector('img')) // Ensure there's an image in the div
    .map(div => {
      const img = div.querySelector('img');
      const textContent = div.querySelector('div:last-child');

      // Create image element
      const imageElement = document.createElement('img');
      imageElement.src = img.getAttribute('src');
      imageElement.alt = img.alt;
      imageElement.width = img.width;
      imageElement.height = img.height;

      // Prepare text cell content
      let textElements = [];
      if (textContent) {
        const title = textContent.querySelector('h1, h2, h3, h4, h5, h6');
        const paragraph = textContent.querySelector('p');
        const link = textContent.querySelector('a');

        if (title) {
          const heading = document.createElement('h2');
          heading.textContent = title.textContent;
          textElements.push(heading);
        }

        if (paragraph) {
          const para = document.createElement('p');
          para.textContent = paragraph.textContent;
          textElements.push(para);
        }

        if (link) {
          const anchor = document.createElement('a');
          anchor.href = link.href;
          anchor.textContent = link.textContent;
          textElements.push(anchor);
        }
      }

      return [imageElement, textElements.length > 0 ? textElements : ''];
    });

  const uniqueRows = rows.filter((row, index, self) => {
    const imageSrc = row[0].src;
    return self.findIndex(r => r[0].src === imageSrc) === index;
  });

  const table = WebImporter.DOMUtils.createTable([headerRow, ...uniqueRows], document);
  element.replaceWith(table);
}