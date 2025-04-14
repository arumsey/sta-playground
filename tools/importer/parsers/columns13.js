/* global WebImporter */
export default function parse(element, { document }) {
    // Create header row that matches the example exactly
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Extract data and build table cells array
    const cells = [[headerRow[0]]]; // Ensure header row matches the example exactly
    const rows = element.querySelectorAll('.row');

    rows.forEach(row => {
        const columns = [];

        row.querySelectorAll('.col-xs-12').forEach(col => {
            const content = [];

            // Extract images dynamically
            col.querySelectorAll('img').forEach(img => {
                if (img.src) {
                    const image = document.createElement('img');
                    image.src = img.src;
                    image.alt = img.alt || '';
                    content.push(image);
                }
            });

            // Extract text and other elements dynamically
            col.querySelectorAll('p, h5, ul').forEach(el => {
                if (el.textContent.trim() || el.querySelector('a')) {
                    content.push(el.cloneNode(true));
                }
            });

            columns.push(content.length ? content : ['']); // Add empty cell if column has no valid content
        });

        if (columns.length > 0) {
            cells.push(columns); // Ensure non-empty rows are added
        }
    });

    // Create table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}