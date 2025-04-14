/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the teasers content
    const teasers = Array.from(element.querySelectorAll('.teasers__teaser')).map(teaser => {
        const img = teaser.querySelector('img');
        const heading = teaser.querySelector('h3');
        const paragraph = teaser.querySelector('p');

        // Create the new content
        const imgElement = document.createElement('img');
        imgElement.src = img.src;
        imgElement.alt = img.alt;
        const headingElement = document.createElement('h3');
        headingElement.textContent = heading.textContent;
        const paragraphElement = document.createElement('p');
        paragraphElement.textContent = paragraph.textContent;

        return [imgElement, headingElement, paragraphElement];
    });

    // Create the table structure with the corrected header formatting
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    const cells = [
        [headerRow], // Corrected header row with bold styling
        teasers.map(content => {
            const container = document.createElement('div');
            container.style.textAlign = 'center';
            container.append(...content);
            return container;
        })
    ];

    // Create the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(block);
}