/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Add header row for Columns block
    cells.push(['Columns']);

    // Iterate over each column in the element
    const columns = element.querySelectorAll('.columns.list.block.columns-2-cols > div');
    const contentRows = [];
    columns.forEach((column) => {
        const content = [];

        // Extract the image and text content into one cell
        const imageWrapper = column.querySelector('picture');
        const textWrapper = column.querySelector('div:last-child');
        
        const cellContent = [];

        if (imageWrapper) {
            const img = imageWrapper.querySelector('img');
            if (img) {
                const clonedImg = document.createElement('img');
                clonedImg.src = img.src;
                clonedImg.alt = img.alt;
                cellContent.push(clonedImg);
            }
        }

        if (textWrapper) {
            const clonedText = textWrapper.cloneNode(true);
            cellContent.push(clonedText);
        }

        // Add combined content to the row
        contentRows.push([cellContent]);
    });

    cells.push(...contentRows);

    // Create the table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the element with the table
    element.replaceWith(table);
}