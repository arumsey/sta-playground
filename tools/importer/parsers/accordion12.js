/* global WebImporter */
export default function parse(element, { document }) {
    // Define the required header row, matching the example exactly
    const headerRow = ['Accordion'];

    // Extract rows dynamically while ensuring no duplicate rows
    const rowsSet = new Set(); // To prevent duplicate rows
    const rows = [...element.querySelectorAll('table tbody tr')].map(row => {
        const cells = row.querySelectorAll('td');

        // Ensure valid content and that rows are not empty
        const titleContent = cells[0]?.innerHTML.trim() || '';
        const contentBody = cells[1]?.innerHTML.trim() || '';

        // Skip empty rows (both title and content empty)
        if (!titleContent && !contentBody) return null;

        // Create sanitized DOM elements for title and content
        const titleElement = document.createElement('span');
        titleElement.innerHTML = titleContent;

        const contentElement = document.createElement('span');
        contentElement.innerHTML = contentBody;

        const serialized = titleContent + contentBody; // Serialize for duplication check
        if (!rowsSet.has(serialized)) {
            rowsSet.add(serialized);
            return [titleElement, contentElement];
        }
        return null;
    }).filter(row => row !== null); // Filter out skipped rows

    // Construct fixed table data with exact header and unique rows
    const tableData = [headerRow, ...rows];

    // Create the block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the newly constructed block table
    element.replaceWith(blockTable);
}