/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ["Columns"];

    // Extract left and right columns from the `row`
    const leftColumn = element.querySelector('.col-xs-12.col-sm-6:first-of-type');
    const rightColumn = element.querySelector('.col-xs-12.col-sm-6:last-of-type');

    // Process the left column (content)
    const leftContent = document.createElement('div');
    if (leftColumn) {
        leftColumn.querySelectorAll('p, a.cta-btn').forEach((child) => {
            leftContent.appendChild(child.cloneNode(true));
        });
    }

    // Process the right column (image and caption)
    const rightImage = rightColumn?.querySelector('img') || null;
    const rightCaption = rightColumn?.querySelector('em') || null;

    const rightContent = document.createElement('div');
    if (rightImage) {
        rightContent.appendChild(rightImage.cloneNode(true));
    }
    if (rightCaption) {
        rightContent.appendChild(rightCaption.cloneNode(true));
    }

    // Create the block table
    const cells = [
        headerRow, // Header row
        [leftContent, rightContent] // Content row
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the structured block table
    element.replaceWith(blockTable);
}