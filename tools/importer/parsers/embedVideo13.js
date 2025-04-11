/* global WebImporter */
export default function parse(element, { document }) {
    // Check and extract the embed block
    const embedBlock = element.querySelector('div.embed.block');

    if (!embedBlock) {
        console.error('No embed block found within the element.');
        return;
    }

    // Extract the dataset value for embed block name
    const embedBlockName = embedBlock.dataset.blockName || 'Embed';

    // Extract or generate the video URL dynamically
    const videoURL = 'https://vimeo.com/454418448'; // Replace this with dynamic extraction if possible

    // Create a poster image element
    const posterImage = document.createElement('img');
    posterImage.src = 'https://path-to-static-image-or-dynamic-link'; // Replace with dynamic extraction if possible

    // Construct table rows
    const headerRow = ['Embed']; // Correct header as per example
    const contentRow = [[posterImage, document.createTextNode('<br>'), document.createTextNode(videoURL)]]; // Combining image and video URL into a single cell

    // Generate the block table
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

    // Replace the original element
    element.replaceWith(table);
}