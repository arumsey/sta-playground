/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Tabs'];

    const tabs = [];

    // Extract the primary menu tab labels and their hrefs dynamically
    const menuItems = element.querySelectorAll('.navigation__desktop__primary-menu li a');
    menuItems.forEach((menuItem) => {
        if (menuItem.textContent.trim()) {
            const label = menuItem.textContent.trim();

            const contentContainer = document.createElement('div');
            contentContainer.innerHTML = `<p>Content dynamically generated based on label: ${label}. Link: <a href="${menuItem.href}">${menuItem.href}</a></p>`;

            tabs.push([label, contentContainer]);
        }
    });

    // Ensure final structure matches example
    const cells = [
        headerRow,
        ...tabs,
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block); // Replace the original element with new block.
}