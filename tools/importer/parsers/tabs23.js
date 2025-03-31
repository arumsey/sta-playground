/* global WebImporter */
export default function parse(element, { document }) {
    // Ensure header row matches given block type
    const headerRow = ['Tabs'];

    // Extract all link items dynamically from the given element
    const linkItems = element.querySelectorAll('a.nuv-quicklinks__item');

    // Map each extracted element to table rows dynamically
    const rows = Array.from(linkItems).map((link) => {
        // Get the label from the span tag within the link
        const label = link.querySelector('.nuv-quicklinks__item-text')?.textContent.trim() || 'Unknown';
        
        // Create a content placeholder (optional)
        const content = document.createElement('div');
        content.textContent = `Content for ${label}`;

        // Return row array containing the label and its corresponding content
        return [label, content];
    });

    // Generate the table with required structure
    const blockTable = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

    // Replace the original element with the newly created block table
    element.replaceWith(blockTable);
}
