/* global WebImporter */
export default function parse(element, { document }) {
    // Helper function to create table rows dynamically
    function createAccordionRow(title, content) {
        return [title, content];
    }

    const headerRow = ['Accordion']; // EXACTLY matches the block name from the example
    const rows = [headerRow];

    // Dynamically find all toggler and accordion content pairs
    const togglers = element.querySelectorAll('p.accordions__toggler');
    const contents = element.querySelectorAll('.accordions__element');

    // Loop through all pairs found and handle missing elements gracefully
    togglers.forEach((toggler, index) => {
        const title = toggler.textContent.trim();
        const contentElement = contents[index];

        if (contentElement) {
            const contentClone = contentElement.cloneNode(true);
            // Remove redundant attributes like inline width, height, and extra styles
            contentClone.querySelectorAll('*').forEach(el => {
                el.removeAttribute('style');
                el.removeAttribute('width');
                el.removeAttribute('height');
                el.removeAttribute('class');

                // Replace redundant non-breaking spaces with regular spaces
                el.innerHTML = el.innerHTML.replace(/&nbsp;/g, ' ').trim();
            });
            
            // Filter out empty paragraphs and other irrelevant elements
            contentClone.querySelectorAll('p').forEach(p => {
                if (!p.textContent.trim()) {
                    p.remove();
                }
            });

            rows.push(createAccordionRow(title, contentClone));
        } else {
            // Handle edge case where content might be empty
            const emptyContent = document.createElement('div');
            rows.push(createAccordionRow(title, emptyContent));
        }
    });

    const block = WebImporter.DOMUtils.createTable(rows, document);
    // Replace the original element with the new block structure without returning anything
    element.replaceWith(block);
}