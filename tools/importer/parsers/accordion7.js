/* global WebImporter */
export default function parse(element, { document }) {
    
    // Helper function to extract accordion items
    const extractAccordionItems = () => {
        const accordions = Array.from(element.querySelectorAll('.accordions__toggler'));
        return accordions.map((accordion) => {
            const title = accordion.textContent.trim();
            const contentElement = accordion.nextElementSibling;
            const content = contentElement ? contentElement.innerHTML.trim() : '';

            const contentFragment = document.createElement('div');
            contentFragment.innerHTML = content;

            return [title, contentFragment];
        });
    };

    // Define the rows for the block table
    const headerRow = ['Accordion'];
    const accordionItems = extractAccordionItems();

    const cells = [
        headerRow,
        ...accordionItems
    ];

    // Create the table using the WebImporter helper
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Ensure the function does not return anything, and only replaces the element
    element.replaceWith(blockTable);
}