/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Header row
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Hero';
    cells.push(headerRow);

    // Content row
    const content = [];

    // Handle background image
    const backgroundImg = element.querySelector('.ct01__background img');
    if (backgroundImg) {
        const imgEl = document.createElement('img');
        imgEl.src = backgroundImg.dataset.src || backgroundImg.src;
        imgEl.alt = backgroundImg.alt || '';
        content.push(imgEl);
    }

    // Handle heading
    const headline = element.querySelector('h2.b01__headline');
    if (headline) {
        const headingEl = document.createElement('h1');
        headingEl.textContent = headline.textContent.trim();
        content.push(headingEl);
    }

    // Handle buttons
    const buttons = element.querySelectorAll('a.b03__button');
    buttons.forEach((button) => {
        const buttonEl = document.createElement('a');
        buttonEl.href = button.href;
        buttonEl.textContent = button.textContent.trim();
        content.push(buttonEl);
    });

    cells.push([content]);

    const table = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(table);
}