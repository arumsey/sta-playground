/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const contentRows = [];

    // Extract each column's info dynamically
    const columns = element.querySelectorAll(':scope > .columns > div');
    columns.forEach((column) => {
        const imageElement = column.querySelector('picture img');
        const image = imageElement ? document.createElement('img') : null;
        if (image) {
            image.src = imageElement.src;
            image.width = imageElement.width;
            image.height = imageElement.height;
        }

        const textContent = column.querySelector('div:last-child');
        const text = textContent ? document.createElement('div') : null;
        if (text) {
            text.innerHTML = textContent.innerHTML;
        }

        const row = image && text ? [image, text] : (image ? [image] : [text]);
        contentRows.push(row);
    });

    const cells = [headerRow, ...contentRows];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}