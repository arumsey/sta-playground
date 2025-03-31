/* global WebImporter */
export default function parse(element, { document }) {
    // Header row must match the example format
    const headerRow = ['Cards'];

    // Collect all rows dynamically
    const rows = Array.from(element.querySelectorAll('.nuv-people-grid__item')).map(item => {
        const imgElement = item.querySelector('img');
        const nameElement = item.querySelector('.nuv-people-grid__name');
        const titleElement = item.querySelector('.nuv-people-grid__title');

        // Prepare dynamic data extraction
        const imgSrc = imgElement?.getAttribute('src');
        const imgAlt = imgElement?.getAttribute('alt') || '';
        const name = nameElement?.textContent.trim();
        const title = titleElement?.textContent.trim();

        const image = document.createElement('img');
        if (imgSrc) {
            image.src = imgSrc;
        }
        image.alt = imgAlt;

        const content = document.createElement('div');

        if (name) {
            const heading = document.createElement('h3');
            heading.textContent = name;
            content.appendChild(heading);
        }

        if (title) {
            const description = document.createElement('p');
            description.textContent = title;
            content.appendChild(description);
        }

        return [image, content];
    });

    // Combine header row and content rows into table data
    const tableData = [headerRow, ...rows];
    const table = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the new table
    element.replaceWith(table);
}
