/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion'];
    const rows = [];

    // Get all accordions from the provided element
    const accordions = Array.from(element.querySelectorAll('.accordions__toggler'));

    accordions.forEach((accordionToggler) => {
        const titleCell = accordionToggler.textContent.trim();

        const contentElement = accordionToggler.nextElementSibling;
        const contentCell = document.createElement('div');

        // If there's content, append that content into the cell
        if (contentElement) {
            contentCell.append(...contentElement.children);
        }

        rows.push([titleCell, contentCell]);
    });

    // Create the table with headers and rows
    const cells = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(blockTable);
}