/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the background image URL
    const panelImage = element.querySelector('.panel__image');
    const imageUrl = panelImage ? panelImage.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1') : '';

    // Extract the headline
    const headlineElement = element.querySelector('.panel__headline');
    const headline = headlineElement ? headlineElement.textContent.trim() : '';

    // Extract optional kicker
    const kickerElement = element.querySelector('.panel__kicker');
    const kicker = kickerElement ? kickerElement.textContent.trim() : '';

    // Create the cells for the table
    const createContentCell = () => {
        const container = document.createElement('div');

        if (imageUrl) {
            const img = document.createElement('img');
            img.src = imageUrl;
            container.appendChild(img);
        }

        if (kicker) {
            const p = document.createElement('p');
            p.textContent = kicker;
            container.appendChild(p);
        }

        if (headline) {
            const h1 = document.createElement('h1');
            h1.textContent = headline;
            container.appendChild(h1);
        }

        return container;
    };

    const cells = [
        ['Hero'], // Header row
        [createContentCell()] // Content row with extracted elements
    ];

    // Replace the element with the new block
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}