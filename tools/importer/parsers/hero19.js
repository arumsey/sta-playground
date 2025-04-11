/* global WebImporter */
export default function parse(element, { document }) {
    // Define the block header row - Fixed text as shown in example
    const headerRow = ['Hero'];

    // Extract title from the provided HTML element
    const title = element.querySelector('h2')?.textContent || '';

    // Extract all paragraph elements and clone their content
    const paragraphs = Array.from(element.querySelectorAll('p')).map(p => {
        return p.cloneNode(true);
    });

    // Extract the button link
    const buttonContainer = element.querySelector('.button-container');
    let buttonLink = null;
    if (buttonContainer) {
        const button = buttonContainer.querySelector('a');
        if (button) {
            buttonLink = button.cloneNode(true);
        }
    }

    // Combine extracted content into a single cell for the table
    const content = [];

    // Separator element (optional, as shown in description)
    if (document.createElement) {
        const hr = document.createElement('hr');
        content.push(hr);
    }

    // Add title as an h2 element
    if (title) {
        const titleElement = document.createElement('h2');
        titleElement.textContent = title;
        content.push(titleElement);
    }

    // Add paragraphs
    content.push(...paragraphs);

    // Add button if it exists
    if (buttonLink) {
        content.push(buttonLink);
    }

    // Create the block table using the WebImporter helper function
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, [content]], document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}