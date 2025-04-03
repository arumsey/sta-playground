/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards'];

    // Extract content and create structured card rows
    const cards = Array.from(element.querySelectorAll('li')).map((card) => {
        const image = card.querySelector('svg'); // Extract SVG as image substitute

        const titleElem = card.querySelector('span'); // Extract title
        const descriptionElem = card.querySelector('div'); // Extract description text

        const title = titleElem ? titleElem.textContent.trim() : ''; // Use title or fallback
        const description = descriptionElem ? descriptionElem.textContent.trim() : ''; // Use description or fallback

        // Create structured text content with proper formatting
        const textContent = [];
        if (title) {
            const titleElement = document.createElement('strong');
            titleElement.textContent = title;
            textContent.push(titleElement);
        }
        if (description) {
            if (textContent.length > 0) {
                textContent.push(document.createElement('br'));
            }
            const descriptionNode = document.createTextNode(description);
            textContent.push(descriptionNode);
        }

        // Substitute missing images with visually consistent placeholder
        const imageContent = image ? image.cloneNode(true) : document.createTextNode('Image placeholder');

        // Exclude rows where both image and text are missing
        if (!image && textContent.length === 0) {
            return null;
        }

        return [imageContent, textContent];
    }).filter(row => row !== null); // Remove null rows

    // Combine header row and card rows into a single structured block table
    const blockData = [headerRow, ...cards];
    const blockTable = WebImporter.DOMUtils.createTable(blockData, document);

    // Replace the original element with the formatted block table
    element.replaceWith(blockTable);
}