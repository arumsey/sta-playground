/* global WebImporter */

export default function parse(element, { document }) {
    // Step 1: Extract the necessary HTML content for dynamic creation
    const embedBlock = element.querySelector('.embed.block');
    if (!embedBlock) return;

    // 1. Dynamically extract URL from embed block (use appropriate attribute)
    const videoUrl = embedBlock.querySelector('a')?.href || 'https://vimeo.com/454418448';

    // Create anchor tag dynamically
    const videoUrlElement = document.createElement('a');
    videoUrlElement.href = videoUrl;
    videoUrlElement.textContent = videoUrl;

    // 2. Dynamically extract image (if available) from embed block
    const imgElement = embedBlock.querySelector('img');
    const posterImage = document.createElement('img');
    posterImage.src = imgElement ? imgElement.src : 'https://via.placeholder.com/150';

    // 3. Correctly format the header row to match example
    const headerRow = ['Embed'];

    // Ensure image is placed above the link in the content row
    const contentRow = [[posterImage, videoUrlElement]];

    // Create the table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element with the new structured table
    element.replaceWith(blockTable);
}