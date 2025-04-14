/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Extract header row
    const headerRow = ['Columns'];
    rows.push(headerRow);

    // Extract all items in the element
    const links = [...element.querySelectorAll('.icon-and-text__link')];

    // Create columns dynamically for each link
    const columns = links.map(link => {
        const columnContent = [];

        // Extract image
        const image = link.querySelector('img');
        if (image) {
            columnContent.push(image.cloneNode(true));
        }

        // Extract text
        const text = link.querySelector('.icon-and-text__text')?.textContent?.trim();
        if (text) {
            const textElement = document.createElement('div');
            textElement.textContent = text;
            columnContent.push(textElement);
        }

        return columnContent;
    });

    // Add the columns row to table
    rows.push(columns);

    // Create table block
    const block = WebImporter.DOMUtils.createTable(rows, document);

    // Replace original element with the new block
    element.replaceWith(block);
}