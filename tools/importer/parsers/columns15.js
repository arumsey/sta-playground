/* global WebImporter */
export default function parse(element, { document }) {
    // Corrected header row to have exactly one column with the specified text
    const headerRow = ['Columns'];

    const columns = Array.from(element.querySelectorAll('.nuv-article-author__details')).map((author) => {
        const imageLink = author.querySelector('.nuv-article-author__image a');
        const image = imageLink ? imageLink.querySelector('picture') || imageLink.querySelector('img') : null;

        const nameEl = author.querySelector('.nuv-article-author__name');
        const titleEl = author.querySelector('.nuv-article-author__title');
        const buttonEl = author.querySelector('.nuv-button__btn');

        const columnContent = [];
        if (image) {
            columnContent.push(image);
        }
        if (nameEl) {
            const name = document.createElement('p');
            name.textContent = nameEl.textContent.trim();
            name.style.fontWeight = 'bold'; // Use inline styling for bold text instead of wrapping in <b>
            columnContent.push(name);
        }
        if (titleEl) {
            const title = document.createElement('p');
            title.textContent = titleEl.textContent.trim();
            columnContent.push(title);
        }
        if (buttonEl) {
            columnContent.push(buttonEl);
        }

        return columnContent;
    });

    const tableRows = [
        headerRow,
        columns,
    ];

    const tableBlock = WebImporter.DOMUtils.createTable(tableRows, document);
    element.replaceWith(tableBlock);
}
