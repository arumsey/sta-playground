/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract image
  const image = element.querySelector('picture img');
  const extractedImage = document.createElement('img');
  extractedImage.src = image?.src || '';
  extractedImage.alt = image?.alt || '';

  // Extract main text content
  const textParagraphs = Array.from(element.querySelectorAll('.default-content-wrapper > p'));
  const textContentArray = textParagraphs.map(p => p.textContent.trim()).filter(t => t !== '');
  const combinedTextContent = textContentArray.join(' ');

  // Extract links from the list
  const listItems = element.querySelectorAll('ul li a');
  const links = Array.from(listItems).map(link => {
    const a = document.createElement('a');
    a.setAttribute('href', link.href);
    a.setAttribute('title', link.title);
    a.textContent = link.textContent;
    return a;
  });

  // Create rows and cells for the table
  const cells = [
    headerRow,
    [
      combinedTextContent,
      links,
      extractedImage,
    ],
  ];

  // Create the table using DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}