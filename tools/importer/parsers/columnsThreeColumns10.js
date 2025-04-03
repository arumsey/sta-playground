/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create the desired block
    const createBlock = (titleText, buttonText, buttonLink) => {
        const titleElement = document.createElement('h3');
        titleElement.textContent = titleText;

        const buttonElement = document.createElement('a');
        buttonElement.textContent = buttonText;
        buttonElement.href = buttonLink;
        buttonElement.setAttribute('target', '_blank');
        buttonElement.className = 'button';

        return [titleElement, buttonElement];
    };

    // Extracting data from the element
    const columnElements = element.querySelectorAll('.ct01__column');
    const columns = Array.from(columnElements).map(col => {
        const titleElement = col.querySelector('.b02__rich-text h3 span span');
        const title = titleElement ? titleElement.textContent.trim() : '';

        const buttonElement = col.querySelector('.b03__button');
        const buttonText = buttonElement ? buttonElement.textContent.trim() : '';
        const buttonLink = buttonElement ? buttonElement.href : '#';

        return createBlock(title, buttonText, buttonLink);
    });

    // Fixing the header row to match the exact specification in the example
    const headerRow = ['Columns (three columns)'];
    const blockContent = [
        headerRow,
        columns
    ];

    const table = WebImporter.DOMUtils.createTable(blockContent, document);

    // Replace the original element with the created table only (no return statement)
    element.replaceWith(table);
}