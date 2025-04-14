/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Add header row
    cells.push(['Accordion']);

    // Extract content from the element
    const togglerElements = Array.from(element.querySelectorAll('.accordions__toggler'));
    const contentElements = Array.from(element.querySelectorAll('.accordions__element'));

    togglerElements.forEach((toggler, index) => {
        const content = contentElements[index];

        // Combine title and content into rows
        const title = toggler.textContent.trim();

        // Clone content to preserve structure
        const clonedContent = content.cloneNode(true);

        cells.push([title, clonedContent]);
    });

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);
}