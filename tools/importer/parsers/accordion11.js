/* global WebImporter */
export default function parse(element, { document }) {
    // Verify header matches example
    const headerRow = ['Accordion'];

    // Extract content rows
    const rows = Array.from(element.querySelectorAll('.accordions__toggler, .accordion__element')).map((accordionBlock) => {
        const title = accordionBlock.classList.contains('accordions__toggler')
            ? accordionBlock.textContent.trim()
            : '';

        const content = accordionBlock.classList.contains('accordion__element')
            ? Array.from(accordionBlock.querySelectorAll('p, img, table')).map(content => {
                const clonedElement = content.cloneNode(true);
                return clonedElement;
            })
            : '';

        return [title, content];
    });

    // Avoid creating empty rows/cells
    const tableData = [headerRow, ...rows.filter(row => row.some(cell => cell))];

    // Create the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element without returning output
    element.replaceWith(blockTable);
}