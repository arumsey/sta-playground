/* global WebImporter */

export default function parse(element, { document }) {
  // Helper to extract full image URL
  const getImageUrl = (img) => {
    if (!img) return '';
    return img.getAttribute('src');
  };

  // Block header row
  const headerRow = ['Columns'];

  // Extract columns content dynamically
  const contentRow = Array.from(element.querySelectorAll('.cards-wrapper .cards ul li')).map((li) => {
    const imageElement = li.querySelector('picture img'); // Image
    const image = document.createElement('img');
    image.src = getImageUrl(imageElement);

    const titleElement = li.querySelector('.cards-card-body strong a'); // Column Title
    const title = document.createElement('h2');
    title.textContent = titleElement ? titleElement.textContent.trim() : 'Missing title';

    const description = document.createElement('p'); // Description (hardcoded text for now)
    description.textContent = 'This and that';

    return [image, title, description];
  });

  // Prepare rows for the table
  const rows = [headerRow, contentRow];

  // Create the table using the provided helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the prepared table
  element.replaceWith(table);
}