/* global WebImporter */
export default function parse(element, { document }) {
    // Safeguard: Verify element availability
    if (!element || !document) return;

    // Extract the primary heading and paragraph content dynamically
    const heading = element.querySelector('h2');
    const headingContent = heading ? heading.textContent : '';

    const paragraph = element.querySelector('p');
    const paragraphContent = paragraph ? paragraph.textContent : '';

    // Extract the picture dynamically, fallback if missing
    const picture = element.querySelector('picture');
    const img = picture?.querySelector('img');
    const imgElement = img ? img.cloneNode(true) : document.createTextNode('');

    // Ensure proper headers match example structure
    const headerRow = ['Columns'];

    // Create rows: Dynamically ensure empty content is gracefully handled
    const contentRow = [
        [headingContent, paragraphContent],
        imgElement,
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable([
        headerRow, // Header row (block name)
        contentRow // Content row with elements
    ], document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}