/* global WebImporter */
export default function parse(element, { document }) {
    const cells = [];

    // Header Row
    cells.push(["Columns"]);

    // Second Row (all stats cards in a single row)
    const stats = [...element.querySelectorAll(".nuv-stats-card__caption")].map((stat) => {
        const text = stat.textContent.trim();
        const div = document.createElement('div');
        div.textContent = text; // Wrap text into div
        return div;
    });
    cells.push(stats);

    // Create table using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(block);
}
