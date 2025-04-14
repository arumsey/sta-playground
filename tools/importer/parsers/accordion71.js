/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Header row
    const headerRow = ['Accordion'];
    rows.push(headerRow);

    // Accordion Title
    const titleElement = element.querySelector('.accordions__toggler');
    const title = titleElement ? titleElement.textContent.trim() : 'Untitled';

    // Content
    const contentContainer = element.querySelector('.accordions__element');
    const contentBlocks = [];
    if (contentContainer) {
        const paragraphs = contentContainer.querySelectorAll('p');
        paragraphs.forEach(p => {
            contentBlocks.push(p.cloneNode(true));
        });

        // Add Images
        const images = contentContainer.querySelectorAll('img');
        images.forEach(img => {
            contentBlocks.push(img.cloneNode(true));
        });
    }

    rows.push([title, contentBlocks]);

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}