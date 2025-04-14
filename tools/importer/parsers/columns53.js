/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example
  const headerRow = ['Columns'];

  // Extract relevant contents from the provided HTML
  const paragraphs = Array.from(element.querySelectorAll('p')).map(e => e.textContent.trim());

  const images = Array.from(element.querySelectorAll('img')).map(img => {
    const imageElement = document.createElement('img');
    imageElement.setAttribute('src', img.getAttribute('src'));
    imageElement.setAttribute('alt', img.getAttribute('alt') || '');
    return imageElement;
  });

  const links = Array.from(element.querySelectorAll('a')).map(link => {
    const anchorElement = document.createElement('a');
    anchorElement.setAttribute('href', link.getAttribute('href'));
    anchorElement.textContent = link.textContent.trim();
    return anchorElement;
  });

  // Construct cells array dynamically using extracted data
  const cells = [
    headerRow,
    [
      paragraphs[0],
      images[0]
    ],
    [
      images[1],
      [
        paragraphs[1],
        ...links
      ]
    ]
  ];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}