/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the content for the left column
    const headingElement = element.querySelector('h2.teasers__teaser');
    const heading = headingElement?.textContent?.trim() || '';

    const linkElements = element.querySelectorAll('ul.panel__links li a');
    const links = Array.from(linkElements).map(link => {
        const anchor = document.createElement('a');
        anchor.href = link.href;
        anchor.textContent = link.textContent.trim();
        return anchor;
    });

    const leftColumn = [];
    if (heading) {
        const headingNode = document.createTextNode(heading);
        leftColumn.push(headingNode);
        leftColumn.push(document.createElement('br'));
    }

    if (links.length > 0) {
        links.forEach(link => {
            const paragraph = document.createElement('p');
            paragraph.appendChild(link);
            leftColumn.push(paragraph);
        });
    }

    // Extract the content for the right column
    const imageElement = element.querySelector('img');
    const image = imageElement ? imageElement.cloneNode(true) : document.createTextNode('');

    const rightColumn = [image];

    // Create the table header
    const headerRow = ['Columns'];

    // Create the table data
    const tableData = [
        headerRow,
        [leftColumn, rightColumn]
    ];

    // Create the block table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with the new block table
    element.replaceWith(table);
}