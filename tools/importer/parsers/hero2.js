/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero'];

    // Extracting data from the provided HTML
    const pictureElement = element.querySelector('picture');
    const imgElement = pictureElement ? pictureElement.querySelector('img') : null;
    const headingElement = element.querySelector('h1');

    // Preparing elements for the table
    const content = document.createElement('div');
    const image = imgElement ? imgElement.cloneNode(true) : '';
    const heading = headingElement ? document.createElement('h1') : '';
    if (headingElement) {
        heading.innerHTML = headingElement.innerHTML.trim();
    }
    if (image) {
        content.appendChild(image);
    }
    if (heading) {
        content.appendChild(heading);
    }

    // Creating the cells for the table
    const cells = [
        headerRow,
        [content],
    ];

    // Creating the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replacing the original element with the block
    element.replaceWith(block);
}