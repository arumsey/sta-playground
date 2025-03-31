/* global WebImporter */
export default function parse(element, { document }) {
    const rows = [];

    // Add the header row with the block name, matching the example exactly
    rows.push(['Cards']);

    // Extract individual cards information
    const items = element.querySelectorAll('.nuv-people-grid__item');
    items.forEach((item) => {
        const imageContainer = item.querySelector('picture');
        const image = imageContainer?.querySelector('img');

        const nameElement = item.querySelector('.nuv-people-grid__name');
        const titleElement = item.querySelector('.nuv-people-grid__title');
        const eyebrowElement = item.querySelector('.nuv-people-grid__featured-eyebrow');

        const imageElement = document.createElement('img');
        if (image) {
            imageElement.src = image.src;
            imageElement.alt = image.alt || '';
        }

        const textContainer = document.createElement('div');
        if (nameElement) {
            const nameHeading = document.createElement('h3');
            nameHeading.textContent = nameElement.textContent;
            textContainer.appendChild(nameHeading);
        }
        if (eyebrowElement && eyebrowElement.textContent.trim() !== '') {
            const eyebrowParagraph = document.createElement('p');
            eyebrowParagraph.textContent = eyebrowElement.textContent;
            textContainer.appendChild(eyebrowParagraph);
        }
        if (titleElement) {
            const titleParagraph = document.createElement('p');
            titleParagraph.textContent = titleElement.textContent;
            textContainer.appendChild(titleParagraph);
        }

        rows.push([imageElement, textContainer]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}
