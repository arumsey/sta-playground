/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create structured block
    function createStickyCTAContent(element, document) {
        // Dynamically extract content
        const image = element.querySelector('img');
        const heading = element.querySelector('h4, h5');
        const paragraph = element.querySelector('p');
        const button = element.querySelector('a');

        // Build content row by grouping elements into a single cell
        const contentCell = [];

        if (image) {
            const imgElement = document.createElement('img');
            imgElement.src = image.src;
            contentCell.push(imgElement);
        }

        if (heading) {
            const headingText = document.createTextNode(heading.textContent);
            contentCell.push(headingText);
            contentCell.push(document.createElement('br'));
        }

        if (paragraph) {
            const paragraphText = document.createTextNode(paragraph.textContent);
            contentCell.push(paragraphText);
            contentCell.push(document.createElement('br'));
        }

        if (button) {
            const linkElement = document.createElement('a');
            linkElement.href = button.href;
            linkElement.textContent = button.textContent;
            contentCell.push(linkElement);
        }

        // Build rows array with grouping and <hr> for separators if needed
        const headerRow = ['Sticky CTA'];
        const rows = [headerRow, [contentCell]];

        const table = WebImporter.DOMUtils.createTable(rows, document);

        // Add <hr> if the block needs to represent a distinct section
        const hr = document.createElement('hr');
        return [hr, table];
    }

    // Replace the given element with the constructed block (with separator if required)
    const [hrElement, tableBlock] = createStickyCTAContent(element, document);
    element.parentNode.replaceChild(hrElement, element);
    hrElement.parentNode.insertBefore(tableBlock, hrElement.nextSibling);
}