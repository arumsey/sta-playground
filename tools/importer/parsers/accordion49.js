/* global WebImporter */

export default function parse(element, { document }) {
  const rows = [['Accordion']]; // Initialize rows array with header row

  // Identify all teaser elements within the input element
  const teasers = element.querySelectorAll('.teasers__teaser');

  // Iterate over the teaser elements to form the rows
  teasers.forEach((teaser) => {
    const title = teaser.querySelector('h5');
    const content = document.createElement('div');

    // Add paragraphs and links from the teaser into the content div
    teaser.querySelectorAll('p, a').forEach((node) => {
      // Skip empty paragraphs and duplicate links
      if (
        (node.tagName === 'P' && node.textContent.trim()) ||
        (node.tagName === 'A' && !content.querySelector(`a[href='${node.href}']`))
      ) {
        content.appendChild(node.cloneNode(true));
      }
    });

    // Add the title and content div into rows
    if (title && content.innerHTML.trim()) {
      rows.push([title, content]);
    }
  });

  // Create the block table using the helper function
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}