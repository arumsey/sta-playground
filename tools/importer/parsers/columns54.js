/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const columnsContent = [];

    // Process each column within the element
    Array.from(element.querySelectorAll('.col')).forEach((col) => {
        const columnElements = [];

        // Add the column title dynamically
        const title = col.querySelector('h4');
        if (title) {
            const titleElement = document.createElement('p');
            titleElement.textContent = title.textContent.trim();
            columnElements.push(titleElement);
        }

        // Process individual rows within the column dynamically
        col.querySelectorAll('.row').forEach((row) => {
            const image = row.querySelector('img');
            const text = row.querySelector('p');

            if (image && text) {
                const imgElement = document.createElement('img');
                imgElement.src = image.src;
                imgElement.alt = image.alt;
                imgElement.style.maxWidth = image.style.maxWidth;

                const contentElement = document.createElement('div');
                const textElement = document.createElement('p');
                textElement.innerHTML = text.innerHTML.trim();

                contentElement.appendChild(imgElement);
                contentElement.appendChild(document.createElement('br'));
                contentElement.appendChild(textElement);

                columnElements.push(contentElement);
            }
        });

        columnsContent.push(columnElements);
    });

    const tableData = [
        headerRow,
        columnsContent
    ];

    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);
    
    element.replaceWith(blockTable);
}