/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [
    ['Cards'], // Header row
  ];

  // Extract individual teasers from the HTML
  const teasers = element.querySelectorAll('.teasers__teaser');

  teasers.forEach((teaser) => {
    const img = teaser.querySelector('img');
    const title = teaser.querySelector('h3');
    const paragraphs = teaser.querySelectorAll('p');

    // Create the image element dynamically
    const image = document.createElement('img');
    image.src = img ? img.src : ''; // Account for missing images
    image.alt = img ? img.alt || '' : ''; // Handle missing alt text

    // Create the content dynamically
    const contentDiv = document.createElement('div');

    if (title) {
      const heading = document.createElement('h3');
      heading.textContent = title.textContent.trim();
      contentDiv.appendChild(heading);
    }

    paragraphs.forEach((para) => {
      const p = document.createElement('p');

      // Use text nodes to ensure proper spacing and structure
      const textNodeOnly = document.createTextNode(para.textContent.trim());
      p.appendChild(textNodeOnly);

      const link = para.querySelector('a');
      if (link) {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        p.appendChild(document.createTextNode(' ')); // Ensure proper spacing between text and links
        p.appendChild(a);
      }
      contentDiv.appendChild(p);
    });

    if (contentDiv.childNodes.length > 0 || image.src) {
      cells.push([image, contentDiv]);
    }
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}