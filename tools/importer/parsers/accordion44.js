/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Accordion']; // Header line is exact as required
    const rows = [];

    // Extract all the accordion toggler and content elements
    const togglers = element.querySelectorAll('.accordions__toggler');
    const contents = element.querySelectorAll('.accordions__element');

    togglers.forEach((toggler, index) => {
        const contentElement = contents[index];
        let title = toggler.textContent.trim();

        let content = '';
        if (contentElement) {
            content = contentElement.innerHTML.trim();
        }

        // Handle inner elements while removing redundant spacing and empty elements
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = content;

        const cleanedContentElements = Array.from(tempDiv.childNodes).map(node => {
            if (node.nodeType === 3 && node.textContent.trim() !== '') { // TEXT_NODE and non-empty
                return node.textContent.trim();
            } else if (node.nodeType === 1 && node.innerHTML.trim() !== '' && node.tagName !== 'BR') { // ELEMENT_NODE, non-empty, exclude <br>
                return node;
            }
        }).filter(Boolean); // Remove undefined or empty nodes

        rows.push([title, cleanedContentElements]);
    });

    const tableData = [headerRow, ...rows];
    const block = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(block);
}