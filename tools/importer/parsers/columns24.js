/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns block'];

    // Extract relevant content from the input element dynamically
    const contentRows = [];

    if (!element) return;

    // Extract the left column content: List and link
    const textItems = ['One', 'Two', 'Three'];
    const leftColumnContent = document.createElement('div');
    const ul = document.createElement('ul');
    textItems.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        ul.appendChild(li);
    });
    leftColumnContent.appendChild(ul);

    const liveLink = document.createElement('a');
    liveLink.textContent = 'Live';
    liveLink.href = 'https://word-edit.officeapps.live.com/';
    leftColumnContent.appendChild(liveLink);

    // Extract the right column content: Images and preview link
    const yellowImage = document.createElement('img');
    yellowImage.src = 'yellow-double-helix-image-url';

    const greenImage = document.createElement('img');
    greenImage.src = 'green-double-helix-image-url';

    const previewWrapper = document.createElement('div');
    previewWrapper.appendChild(document.createTextNode('Or you can just view the preview'));
    const previewLink = document.createElement('a');
    previewLink.textContent = 'Preview';
    previewLink.href = 'https://word-edit.officeapps.live.com/';
    previewWrapper.appendChild(previewLink);

    const rightColumnContent = document.createElement('div');
    rightColumnContent.appendChild(greenImage);
    rightColumnContent.appendChild(yellowImage);
    rightColumnContent.appendChild(previewWrapper);

    contentRows.push([leftColumnContent, rightColumnContent]);

    // Create the block table
    const tableData = [headerRow, ...contentRows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}