/* global WebImporter */
export default function parse(element, { document }) {
    // Extract content from the text section (first column)
    const textSectionElement = element.querySelector('.col-xs-12.col-sm-6.col-md-9 .teasers__teaser');
    const paragraph = textSectionElement ? textSectionElement.querySelector('p') : null;
    const links = textSectionElement ? textSectionElement.querySelector('ul.panel__links') : null;

    // Combine all textual content into a single cell
    const combinedTextContent = document.createElement('div');
    if (paragraph) {
        combinedTextContent.appendChild(paragraph.cloneNode(true));
    }
    if (links) {
        combinedTextContent.appendChild(links.cloneNode(true));
    }

    // Extract content from the image section (second column)
    const imageSectionElement = element.querySelector('.col-xs-12.col-sm-6.col-md-3 .teasers__teaser');
    const image = imageSectionElement ? imageSectionElement.querySelector('img') : null;

    // Prepare content for block table
    const headerRow = ['Columns'];
    
    const textContentCell = [
        combinedTextContent
    ];

    const imageContentCell = [
        image
    ].filter(Boolean); // Filter out nulls

    // Create block table
    const cells = [
        headerRow,
        textContentCell,
        imageContentCell
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with new block table
    element.replaceWith(block);
}