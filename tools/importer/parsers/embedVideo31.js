/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Sticky CTA'];

    // Extract image
    const image = element.querySelector('.sticky-cta__inner__img');
    let imgElement = null;
    if (image) {
        imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt || '';
    }

    // Extract text
    const ctaText = element.querySelector('.sticky-cta__inner__text h4');
    const textContent = ctaText ? ctaText.textContent.trim() : '';

    // Extract link
    const ctaLink = element.querySelector('.sticky-cta__inner__btn');
    let linkElement = null;
    if (ctaLink) {
        linkElement = document.createElement('a');
        linkElement.href = ctaLink.href || '#';
        linkElement.textContent = ctaLink.textContent.trim();
    }

    // Combine extracted elements into one cell
    const combinedCellContent = [];
    if (imgElement) combinedCellContent.push(imgElement);
    if (textContent) combinedCellContent.push(document.createTextNode(textContent));
    if (linkElement) combinedCellContent.push(linkElement);

    // Construct table cells
    const cells = [
        headerRow,
        [combinedCellContent],
    ];

    // Create table block
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace element with block
    element.replaceWith(block);
}