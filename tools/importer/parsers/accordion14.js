/* global WebImporter */
export default function parse(element, { document }) {
    // Define the header row for Accordion block
    const headerRow = ['Accordion'];

    // Extract relevant data from the element
    const paginationItems = Array.from(element.querySelectorAll('ul.pagination li a'));

    // Map over the pagination items to construct rows
    const rows = paginationItems.map(item => {
        const titleElement = item.querySelector('.paginate-ctrl__caption');
        const iconElement = item.querySelector('.paginate-ctrl__icon');

        // Ensure content is extracted dynamically and safely
        const title = titleElement ? titleElement.textContent.trim() : '';
        const content = [];

        if (iconElement) {
            content.push(iconElement.cloneNode(true));
        }

        // Return constructed row elements
        return [title, content.length > 0 ? content : ''];
    });

    // Combine header row and content rows
    const tableData = [headerRow, ...rows];

    // Create the table block using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    // Replace the original element with the newly created block table
    element.replaceWith(block);
}
