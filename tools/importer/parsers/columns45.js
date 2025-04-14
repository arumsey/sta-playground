/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Extracting data from the element
    const buttons = [...element.querySelectorAll('button')];

    // Prepare content for each column
    const columns = buttons.map((button) => {
        const textContent = document.createElement('span');
        textContent.textContent = button.textContent;
        return textContent;
    });

    // Creating table cells
    const cells = [
        headerRow,
        columns
    ];

    // Create block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new table
    element.replaceWith(blockTable);
}