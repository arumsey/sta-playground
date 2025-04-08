/* global WebImporter */
export default function parse(element, { document }) {
    const cards = element.querySelectorAll('.cards-card-body');
    const headerRow = ['Columns'];
    const contentRow = Array.from(cards).map(card => {
        const imgWrapper = card.previousElementSibling;
        const imgTag = imgWrapper.querySelector('img');
        const image = document.createElement('img');
        image.src = imgTag.src;
        image.alt = imgTag.alt;

        const title = card.querySelector('h3').textContent.trim();
        const description = card.querySelector('p').textContent.trim();

        const titleElement = document.createElement('h3');
        titleElement.textContent = title;

        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = description;

        return [image, titleElement, descriptionElement];
    });

    const cells = [
        headerRow,
        contentRow
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}