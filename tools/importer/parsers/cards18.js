/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards'];

    const rows = Array.from(element.querySelectorAll('.teasers__teaser')).map(teaser => {
        const image = teaser.querySelector('img');
        const imageElement = document.createElement('img');

        if (image) {
            imageElement.setAttribute('src', image.getAttribute('src'));
            imageElement.setAttribute('alt', image.getAttribute('alt') || '');
        } else {
            imageElement.setAttribute('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='); // Transparent placeholder
            imageElement.setAttribute('alt', 'Image not provided');
        }

        const titleElement = teaser.querySelector('h3');
        const title = titleElement ? document.createElement('strong') : null;
        if (titleElement) {
            title.textContent = titleElement.textContent;
        }

        const descriptionElement = teaser.querySelector('p:nth-of-type(1)');
        const description = descriptionElement ? descriptionElement.cloneNode(true) : null;

        const textContent = [];
        if (title) {
            textContent.push(title);
        }

        if (description) {
            if (textContent.length > 0) {
                textContent.push(document.createElement('br')); // insert line break only if there's preceding content
            }
            textContent.push(description);
        }

        return [imageElement, textContent.length > 0 ? textContent : ['Data unavailable']];
    });

    const allCells = [headerRow, ...rows];
    const tableBlock = WebImporter.DOMUtils.createTable(allCells, document);

    element.replaceWith(tableBlock);
}