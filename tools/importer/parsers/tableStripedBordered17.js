/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create section breaks
    const createSectionBreak = () => document.createElement('hr');

    // Function to process tables
    const processTable = (table) => {
        const rows = [];

        // Extract headers
        const headers = Array.from(table.querySelectorAll('thead tr th')).map(th => th.textContent.trim());
        rows.push(headers);

        // Extract rows and their data
        const bodyRows = table.querySelectorAll('tbody tr');
        bodyRows.forEach((row) => {
            const rowData = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
            rows.push(rowData);
        });

        return rows;
    };

    // Parse the element
    const contentCells = [];

    // Process section headings
    const headings = element.querySelectorAll('h2, h4, h5');
    headings.forEach((heading) => {
        contentCells.push([heading]);
    });

    // Process paragraphs
    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach((paragraph) => {
        contentCells.push([paragraph]);
    });

    // Add section breaks where logical
    contentCells.push([createSectionBreak()]);

    // Process tables
    const tables = element.querySelectorAll('table');
    tables.forEach((table) => {
        const tableContent = processTable(table);
        tableContent.forEach((row) => contentCells.push(row));
        contentCells.push([createSectionBreak()]);
    });

    // Ensure proper structure and handle edge cases
    if (contentCells.length === 0) {
        contentCells.push(['No content available']);
    }

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(contentCells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}