/* global WebImporter */
export default function parse(element, { document }) {
    // Initialize header row and cell structure
    const cells = [
        ['Embed'],
    ];

    // Extract valid URLs from anchor elements
    const anchors = Array.from(element.querySelectorAll('a')).filter(anchor => {
        const href = anchor.getAttribute('href');
        return href && href.startsWith('http://') || href.startsWith('https://');
    });

    // Populate second row with valid URL or fallback message
    if (anchors.length > 0) {
        const url = anchors[0].getAttribute('href');
        cells.push([url]);
    } else {
        cells.push(['No valid URL found']);
    }

    // Create and replace block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}