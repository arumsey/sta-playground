/* global WebImporter */
export default function parse(element, { document }) {
    // Declare header row for the table
    const headerRow = ['Columns'];

    // Extract image element dynamically
    const image = element.querySelector('picture img');
    const imageElement = document.createElement('img');
    imageElement.src = image.src;
    imageElement.alt = image.alt;

    // Extract paragraphs dynamically
    const descriptionParagraphs = Array.from(element.querySelectorAll('p'))
        .filter(p => p.textContent.trim()) // ignore empty paragraphs
        .map(p => p.cloneNode(true));

    // Extract links dynamically
    const linksList = element.querySelector('ul');
    const links = Array.from(linksList ? linksList.querySelectorAll('li') : [])
        .map(li => li.cloneNode(true));

    // Include an <hr> element to separate sections
    const hrElement = document.createElement('hr');

    // Create table content dynamically
    const cells = [
        headerRow,
        [
            [
                ...descriptionParagraphs,
                hrElement,
                ...links
            ],
            imageElement
        ]
    ];

    // Create the block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(blockTable);
}