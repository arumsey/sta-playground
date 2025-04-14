/* global WebImporter */
export default function parse(element, { document }) {

  // Step 1: Extract all links and their contents dynamically
  const links = [...element.querySelectorAll('.icon-and-text__link')];

  // Step 2: Create cells (rows and columns) for each link
  const columns = links.map(link => {
    const imageDiv = link.querySelector('.icon-and-text__image');
    const textDiv = link.querySelector('.icon-and-text__text');

    // Dynamic image extraction
    const image = imageDiv ? imageDiv.querySelector('img') : null;
    const imgElement = image ? document.createElement('img') : null;
    if (imgElement) {
      imgElement.src = image.getAttribute('src');
    }

    // Extract dynamic text and wrap it in a clickable link
    const textContent = textDiv ? textDiv.textContent.trim() : '';
    const linkElement = document.createElement('a');
    linkElement.href = link.getAttribute('href');
    linkElement.textContent = textContent;

    // Return the image and link within a single column cell
    return [imgElement, linkElement].filter(item => item); // Only include valid elements
  });

  // Step 3: Add header row EXACTLY matching the example
  const headerRow = ['Columns'];

  // Step 4: Combine columns into a structure compatible with createTable
  const rows = [headerRow, ...columns.map(column => [column])];

  // Step 5: Create the block using WebImporter.DOMUtils.createTable
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Step 6: Replace the original element dynamically with the constructed table
  element.replaceWith(table);
}