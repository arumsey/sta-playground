/* global WebImporter */

export default function parse(element, { document }) {
    // Extracting header text dynamically
    const headingElement = element.querySelector('.teasers__teaser h2');
    const heading = headingElement ? document.createElement('h1') : null;
    if (headingElement && heading) {
        heading.textContent = headingElement.textContent.trim();
    }

    // Extracting paragraph text dynamically
    const paragraphElement = element.querySelector('.teasers__teaser p');
    const paragraph = paragraphElement ? document.createElement('p') : null;
    if (paragraphElement && paragraph) {
        paragraph.innerHTML = paragraphElement.innerHTML.trim();
    }

    // Extracting image dynamically
    const imgElement = element.querySelector('img[src]');
    const image = imgElement ? document.createElement('img') : null;
    if (imgElement && image) {
        image.src = imgElement.src;
    }

    // Extracting link dynamically
    const linkElement = element.querySelector('.panel__links a');
    const link = linkElement ? document.createElement('a') : null;
    if (linkElement && link) {
        link.href = linkElement.href;
        link.textContent = linkElement.textContent.trim();
    }

    // Assembling table
    const cells = [];
    const headerRow = ['Hero'];

    const contentRow = [];
    if (heading) contentRow.push(heading);
    if (paragraph) contentRow.push(paragraph);
    if (link) contentRow.push(link);
    if (image) contentRow.push(image);

    if (contentRow.length > 0) {
        cells.push(headerRow);
        cells.push([contentRow]);
    }

    // Creating table block
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replacing original element
    element.replaceWith(blockTable);
}