/* global WebImporter */
export default function parse(element, { document }) {
    // Define header row
    const headerRow = ['Columns'];

    // Extract columns and ensure proper structure
    const columns = Array.from(element.querySelectorAll('.col-xs-12, .col-sm-4, .col-sm-3, .col-md-3')).map((column) => {
        // Extract image
        const img = column.querySelector('img');
        const imageElement = img ? document.createElement('img') : null;
        if (imageElement) {
            imageElement.src = img.src;
            imageElement.alt = img.alt || '';
        }

        // Extract heading
        const heading = column.querySelector('h3')?.textContent?.trim() || '';

        // Extract paragraphs and links
        const paragraphs = Array.from(column.querySelectorAll('p')).map((p) => {
            const paragraphText = p.textContent.trim();
            const link = p.querySelector('a');

            if (link) {
                const linkElement = document.createElement('a');
                linkElement.href = link.href;
                linkElement.textContent = link.textContent.trim();
                return [paragraphText, linkElement].filter(Boolean);
            }

            return paragraphText;
        });

        // Combine heading, image, and paragraphs into column
        return [heading, imageElement, ...paragraphs].filter(Boolean);
    });

    // Ensure each column is properly aligned and consistent
    const structuredRows = [headerRow, columns];

    // Create table block using WebImporter.DOMUtils
    const tableBlock = WebImporter.DOMUtils.createTable(structuredRows, document);

    // Replace original element with the new block
    element.replaceWith(tableBlock);
}