/* global WebImporter */
 export default function parse(element, { document }) {
    const headerRow = ['Accordion'];
    const rows = [];

    const accordionItems = element.querySelectorAll('.accordions__toggler, .accordions__element');

    accordionItems.forEach((item, index) => {
        if (item.matches('.accordions__toggler')) {
            const title = item.textContent.trim();
            let content = '';

            const nextElement = accordionItems[index + 1];
            if (nextElement && nextElement.matches('.accordions__element')) {
                content = nextElement.innerHTML.trim();
            }

            rows.push([title, content]);
        }
    });

    const tableData = [headerRow, ...rows];
    const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(blockTable);
}