/* global WebImporter */
export default function parse(element, { document }) {
    // Correct the header row to use plain text and match the example exactly
    const headerRow = ['Columns'];

    // Extract content dynamically from the input element
    const leftColumn = element.querySelector('.col-sm-6:nth-of-type(1)');
    const rightColumn = element.querySelector('.col-sm-6:nth-of-type(2)');

    // Handle edge cases for empty or missing elements
    const image = leftColumn && leftColumn.querySelector('img') ? leftColumn.querySelector('img') : document.createTextNode('');
    const emText = leftColumn && leftColumn.querySelector('em') ? leftColumn.querySelector('em') : document.createTextNode('');

    const heading = rightColumn && rightColumn.querySelector('h2') ? rightColumn.querySelector('h2') : document.createTextNode('');
    const paragraphs = rightColumn ? Array.from(rightColumn.querySelectorAll('p')) : [];
    const linkButton = rightColumn && rightColumn.querySelector('.cta-btn') ? rightColumn.querySelector('.cta-btn') : document.createTextNode('');

    // Build the table rows dynamically, including null checks
    const cells = [
        headerRow,
        [image, emText],
        [heading, ...paragraphs, linkButton]
    ];

    // Create the table block using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}