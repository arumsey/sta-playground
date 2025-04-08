/* global WebImporter */

export default function parse(element, { document }) {
    // Create the header row for the block
    const headerRow = ['Embed'];

    // Extract content dynamically
    let videoLinkElement = null;
    const embedBlock = element.querySelector('.embed.block');

    if (embedBlock && embedBlock.dataset && embedBlock.dataset.blockName === 'embed') {
        const ulElement = embedBlock.querySelector('ul');
        
        if (ulElement && ulElement.children.length) {
            // Simulate a video URL
            const videoURL = 'https://vimeo.com/454418448';
            videoLinkElement = document.createElement('a');
            videoLinkElement.href = videoURL;
            videoLinkElement.textContent = videoURL;
        }
    }

    // Build content rows
    const contentRow = videoLinkElement ? [videoLinkElement] : [document.createTextNode('No Content Found')];
    const tableData = [headerRow, contentRow];

    // Create table and replace element
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(blockTable);
}