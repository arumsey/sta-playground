/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure dynamic extraction of data from the element
  const rows = [];

  // Insert Header row: EXACTLY matching the example (e.g., "Cards")
  rows.push(['Cards']);

  // Process each card, extracting image, title, and description, handling edge cases
  Array.from(element.querySelectorAll('h3')).forEach((heading) => {
    const imageElement = heading.previousElementSibling?.querySelector('img');
    const descriptionElement = heading.nextElementSibling;

    const cardContent = [];

    // Extract and dynamically create the title element if available
    if (heading) {
      const title = document.createElement('h3');
      title.textContent = heading.textContent;
      cardContent.push(title);
    }

    // Extract text descriptions if present
    if (descriptionElement) {
      const description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
      cardContent.push(description);
    }

    // Handle edge case: Ensure image extraction doesn’t fail
    const image = document.createElement('img');
    if (imageElement) {
      image.src = imageElement.src;
      image.alt = imageElement.alt || ''; // Provide fallback for missing alt
    }

    rows.push([image, cardContent]);
  });

  // Create the block table using WebImporter utility
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with the new table
  element.replaceWith(table);
}