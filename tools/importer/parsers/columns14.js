/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Header row: Ensure it matches example exactly
    rows.push(['Columns']);

    // Create rows for content
    const contentRow = [];
    const columns = element.querySelectorAll('.teasers__teaser');

    columns.forEach((column) => {
        const columnContent = [];

        // Extract image dynamically
        const image = column.querySelector('img');
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt || '';
            columnContent.push(imgElement);
        }

        // Extract header dynamically, skip empty headers
        const header = column.querySelector('h2, h3');
        if (header && header.textContent.trim()) {
            const headerText = document.createElement('div');
            headerText.textContent = header.textContent.trim();
            columnContent.push(headerText);
        }

        // Extract paragraphs dynamically, handle empty ones
        const paragraphs = column.querySelectorAll('p');
        paragraphs.forEach((paragraph) => {
            if (paragraph.textContent.trim()) {
                const paraText = document.createElement('div');
                paraText.innerHTML = paragraph.innerHTML.trim();
                columnContent.push(paraText);
            }
        });

        // Extract links dynamically
        const links = column.querySelectorAll('a');
        links.forEach((link) => {
            if (link.textContent.trim()) {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.textContent = link.textContent.trim();
                columnContent.push(linkElement);
            }
        });

        // Push extracted content dynamically to the content row
        contentRow.push(columnContent);
    });

    // Add content row to the table
    rows.push(contentRow);

    // Ensure final table structure is correct before creation
    const blockTable = WebImporter.DOMUtils.createTable(rows, document);

    // Replace the original element with the structured table
    element.replaceWith(blockTable);
}