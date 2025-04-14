/* global WebImporter */

export default function parse(element, { document }) {
    // Extracting the quote
    const quoteElement = element.querySelector('.col-xs-12.col-sm-4 h1');
    const quote = quoteElement ? quoteElement.textContent.trim() : '';

    // Extracting the attribution/description
    const attributionElement = element.querySelector('.col-xs-12.col-sm-6 .teasers__teaser span');
    const attribution = attributionElement ? attributionElement.textContent.trim() : '';

    // Extracting the link element
    const linkElement = element.querySelector('.col-xs-12.col-sm-6 .cta-btn');

    // Create link node
    const linkNode = linkElement ? document.createElement('a') : undefined;
    if (linkNode) {
        linkNode.href = linkElement.href;
        linkNode.textContent = linkElement.textContent.trim();
    }

    // Creating the table structure
    const cells = [
        ['Quote'],
        [quote],
        [attribution, linkNode ? [linkNode] : []],
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(table);
}