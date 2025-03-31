/* global WebImporter */
export default function parse(element, { document }) {
    // Define the block header row
    const headerRow = ['Search'];

    // Extract the URL dynamically
    const queryIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';

    const urlRow = [queryIndexURL];

    // Create table
    const cells = [
        headerRow,
        urlRow,
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the table
    element.replaceWith(table);
}
