/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block header dynamically matching the example header
  const headerRow = ['Accordion'];

  // Extract content and create rows for the table dynamically
  const rows = Array.from(element.querySelectorAll('.accordions__toggler, .accordions__element')).reduce((accum, item, index, elements) => {
    // Handle empty or missing elements gracefully
    if (!item || item.textContent.trim() === '') return accum;

    // If it's a toggle text header (title)
    if (item.classList.contains('accordions__toggler')) {
      const nextElement = elements[index + 1];
      // Ensure the next element is the corresponding content (div.accordions__element)
      if (nextElement && nextElement.classList.contains('accordions__element')) {
        const titleCell = item.textContent.trim(); // Extract dynamic title cell content

        // Content cell: Accumulate relevant child nodes dynamically
        const contentCell = Array.from(nextElement.childNodes)
          .filter((child) => child.nodeType === 1 || (child.nodeType === 3 && child.textContent.trim() !== '')) // Handle edge cases for empty child nodes
          .map((child) => {
            if (child.nodeType === 3) {
              return document.createTextNode(child.textContent.trim()); // Add text nodes dynamically
            } else {
              return child.cloneNode(true); // Clone existing nodes dynamically
            }
          });

        accum.push([titleCell, contentCell]);
      }
    }
    return accum;
  }, []);

  // Prepend the header row exactly matching the example
  rows.unshift(headerRow);

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}