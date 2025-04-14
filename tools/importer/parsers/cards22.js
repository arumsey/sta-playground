/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Cards']; // Define the header row based on the example

  const cards = Array.from(element.querySelectorAll('.col-sm-4')).map((cardCol) => {
    const teaser = cardCol.querySelector('.teasers__teaser');

    // Extract the image element dynamically
    const image = teaser.querySelector('img');
    const imgElement = document.createElement('img');
    imgElement.src = image?.src || ''; // Handle missing src gracefully
    imgElement.alt = image?.alt || ''; // Handle missing alt gracefully

    // Extract the title element dynamically
    const title = teaser.querySelector('h3');
    const titleElement = document.createElement('strong');
    titleElement.textContent = title?.textContent.trim() || ''; // Handle missing title gracefully

    // Extract all paragraphs dynamically
    const paragraphs = Array.from(teaser.querySelectorAll('p')).map((p) => {
      const paragraph = document.createElement('p');
      paragraph.innerHTML = p.innerHTML.trim();
      return paragraph;
    });

    // Combine title and paragraphs into text content
    const textContent = [titleElement, ...paragraphs];

    return [imgElement, textContent];
  });

  // Create the table array representing the block
  const tableArray = [headerRow, ...cards];

  // Create the block table using the DOMUtils helper
  const block = WebImporter.DOMUtils.createTable(tableArray, document);

  // Replace the input element with the generated block table
  element.replaceWith(block);
}