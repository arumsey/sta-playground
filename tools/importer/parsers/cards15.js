/* global WebImporter */
export default function parse(element, { document }) {
    // Header row as specified
    const headerRow = ['Cards'];

    // Extract rows dynamically
    const rows = Array.from(element.querySelectorAll('.col-xs-12.col-sm-4')).map((cardElement) => {
        // Extract image
        const image = cardElement.querySelector('img');
        const imgElement = image && document.createElement('img');
        if (imgElement) {
            imgElement.src = image.src;
            imgElement.alt = image.alt;
        }

        // Extract title
        const title = cardElement.querySelector('h3');
        const titleText = title ? title.textContent.trim() : '';
        const titleElement = titleText ? document.createElement('strong') : null;
        if (titleElement) {
            titleElement.textContent = titleText;
        }

        // Extract descriptions, including collapsed content
        const description = cardElement.querySelector('p:not(.accordions__toggler)');
        const descriptionText = description ? description.textContent.trim() : '';
        const accordionContent = cardElement.querySelector('.accordion__element');
        const accordionText = accordionContent ? accordionContent.innerHTML.trim() : '';
        const combinedDescriptionElement = document.createElement('div');
        if (descriptionText) combinedDescriptionElement.appendChild(document.createTextNode(descriptionText));
        if (accordionText) combinedDescriptionElement.innerHTML += `<br>${accordionText}`;

        // Extract Call-to-Action (CTA)
        const readMore = cardElement.querySelector('.accordions__toggler .more');
        const readMoreHref = readMore ? readMore.getAttribute('href') || '#' : '#';
        const readMoreText = readMore ? readMore.textContent.trim() : '';
        const readMoreElement = readMoreText ? document.createElement('a') : null;
        if (readMoreElement) {
            readMoreElement.textContent = readMoreText;
            readMoreElement.href = readMoreHref;
        }

        // Combine extracted elements into content array
        const contentElements = [titleElement, combinedDescriptionElement, readMoreElement].filter(Boolean);

        return [imgElement, contentElements];
    });

    // Create table structure
    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with the new structured block
    element.replaceWith(blockTable);
}