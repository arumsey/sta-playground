/* global WebImporter */
export default function parse(element, { document }) {
    // Ensure dynamic extraction for all content

    // Extract header row
    const headerRow = ['Columns'];

    // Initialize content rows for structured table format
    const contentRows = [];

    // First column content: Extract heading, description, list, and button dynamically
    const heading = element.querySelector('h2');
    const headingClone = heading ? heading.cloneNode(true) : document.createTextNode('');
    
    const description = element.querySelector('p');
    const descriptionClone = description ? description.cloneNode(true) : document.createTextNode('');
    
    const list = element.querySelector('ul');
    const listClone = list ? list.cloneNode(true) : document.createTextNode('');
    
    const liveButton = element.querySelector('.cta-btn');
    const liveButtonClone = liveButton ? liveButton.cloneNode(true) : document.createTextNode('');

    const firstColumnContent = document.createElement('div');
    firstColumnContent.append(headingClone, descriptionClone, listClone, liveButtonClone);

    // Second column content: Extract table dynamically
    const calculatorsWrapper = element.querySelector('#pfa-calculators__wrapper');
    const table = calculatorsWrapper ? calculatorsWrapper.querySelector('.table-responsive') : null;
    const tableClone = table ? table.cloneNode(true) : document.createTextNode('');

    const secondColumnContent = document.createElement('div');
    secondColumnContent.append(tableClone);

    // Build rows dynamically
    contentRows.push([firstColumnContent, secondColumnContent]);

    // Construct table data array
    const tableData = [
        headerRow,
        ...contentRows
    ];

    // Create block table using WebImporter helper
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace original element with new block table
    element.replaceWith(blockTable);
}