/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Header row must match the example exactly
    const headerRow = ['Accordion'];
    rows.push(headerRow);

    // Find accordion toggler and content
    const togglers = element.querySelectorAll('.accordions__toggler');

    togglers.forEach(toggler => {
        const title = toggler.textContent.trim();

        // Handle edge case where content is missing
        const contentContainer = toggler.nextElementSibling;

        const content = document.createElement('div');

        if (contentContainer) {
            // Clone nodes to avoid modifying the original document
            [...contentContainer.childNodes].forEach(node => {
                content.appendChild(node.cloneNode(true));
            });
        } else {
            // Insert 'No content available' as a placeholder
            const missingContentMessage = document.createElement('p');
            missingContentMessage.textContent = 'No content available';
            content.appendChild(missingContentMessage);
        }

        rows.push([title, content]);
    });

    // Create block table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element
    element.replaceWith(table);
}