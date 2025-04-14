/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as per example
  const headerRow = ['Accordion'];

  // Collect all accordion items within the element
  const accordionItems = element.querySelectorAll('.teasers__teaser');

  const tableRows = Array.from(accordionItems).map(item => {
    const titleElement = item.querySelector('.accordions__toggler');
    const contentParagraph = item.querySelector('.accordions__element .teasers__teaser > p');
    const imageElement = item.querySelector('.accordions__element img');

    // Extract the title and ensure no 'Missing Title' placeholders
    const title = titleElement ? titleElement.textContent.trim() : '';

    // Initialize content array for dynamically extracted elements
    const content = [];

    // Include the paragraph content if available
    if (contentParagraph) {
      content.push(contentParagraph.cloneNode(true));
    }

    // Include the image only once to avoid duplication
    if (imageElement && !content.some(child => child.tagName === 'IMG' && child.src === imageElement.src)) {
      const clonedImage = imageElement.cloneNode(true);
      content.push(clonedImage);
    }

    // Return structured row data
    return title ? [title, content] : null; // Discard rows without valid titles
  }).filter(Boolean); // Remove null rows

  // Combine the header row with filtered content rows
  const cells = [headerRow, ...tableRows];

  // Create the table using WebImporter.DOMUtils
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}