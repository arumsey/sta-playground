/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns']; // Matches example header row

    const rows = []; // Initialize rows for table data

    // Iterate over each column block
    element.querySelectorAll('.columns > div').forEach((column) => {
        const image = column.querySelector('picture img');

        // Check if image exists and construct img element dynamically
        const imgElement = image ? document.createElement('img') : null;
        if (imgElement) {
            imgElement.src = image.src;
            imgElement.setAttribute('loading', 'lazy'); // Ensure lazy loading
            imgElement.setAttribute('alt', image.getAttribute('alt') || ''); // Handle missing alt text
        }

        const textContent = column.querySelector('div:last-child'); // Extract descriptive text content

        // Extract title (if present) and remaining content separately
        const title = textContent.querySelector('strong');
        const copy = document.createElement('div');

        // Clone only non-title child nodes into the copy div
        Array.from(textContent.childNodes).forEach((node) => {
            if (!node.isEqualNode(title)) {
                copy.appendChild(node.cloneNode(true));
            }
        });

        rows.push([imgElement, [title, copy]]); // Combine image, title, and copy
    });

    // Construct table cells with header and rows
    const cells = [headerRow, ...rows];

    // Create the table using WebImporter helper
    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table); // Replace old content with new table
}