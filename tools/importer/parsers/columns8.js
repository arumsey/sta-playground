/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];
    const contentRow = [];

    // Process each '.teasers__teaser' in the given HTML
    const teasers = element.querySelectorAll('.teasers__teaser h3');
    teasers.forEach(teaser => {
        const link = teaser.querySelector('a');
        const image = teaser.querySelector('img');
        const textElement = teaser.querySelector('span');
        const cellContent = [];

        // Add image to the cell content
        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            imgElement.alt = image.alt;
            imgElement.style = image.style.cssText;
            cellContent.push(imgElement);
        }

        // Add text content if available
        if (link && textElement) {
            const linkElement = document.createElement('a');
            linkElement.href = link.href;
            linkElement.target = link.target;
            linkElement.textContent = textElement.textContent; // Cleanly extract text
            cellContent.push(linkElement);
        }

        // Push the processed cell content into the row
        contentRow.push(cellContent);
    });

    // Create the block table using WebImporter.DOMUtils.createTable
    const cells = [headerRow, contentRow];
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}