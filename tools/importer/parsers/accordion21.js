/* global WebImporter */

export default function parse(element, { document }) {
    const cells = [];

    // Add header row
    const headerRow = ['Accordion'];
    cells.push(headerRow);

    // Extract toggler elements and associated content
    const togglers = element.querySelectorAll('.accordions__toggler');
    const contents = element.querySelectorAll('.accordions__element');

    // Ensure all togglers and contents are processed dynamically
    togglers.forEach((toggler, index) => {
        const content = contents[index];
        if (content) {
            const titleCell = toggler.textContent.trim();
            const contentCell = document.createElement('div');
            contentCell.innerHTML = content.innerHTML; // Retain full HTML structure of content

            // Push the dynamic rows into cells array
            cells.push([titleCell, contentCell]);
        }
    });

    // Create a block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the generated block table
    element.replaceWith(blockTable);
}