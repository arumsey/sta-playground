/* global WebImporter */
export default function parse(element, { document }) {
    // Fixing the header row to match exactly
    const headerRow = ['Columns'];

    // Extract content from the original element
    const title = element.querySelector('h2');
    const paragraph = element.querySelector('p');
    const image = element.querySelector('img');

    // Validate and handle missing content
    const titleContent = title ? title.outerHTML : '';
    const paragraphContent = paragraph ? paragraph.outerHTML : '';
    const imageContent = image ? image : '';

    // Create a structured table as per the requirements
    const cells = [
        [headerRow[0]], // Header row with plain text
        [
            [
                document.createRange().createContextualFragment(titleContent),
                document.createRange().createContextualFragment(paragraphContent)
            ],
            imageContent // Ensure an image element is in a cell
        ]
    ];

    // Generate and replace the original element with block table
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(blockTable);
}