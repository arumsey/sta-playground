/* global WebImporter */
export default function parse(element, { document }) {
    // Extract chart container (the main interactive area)
    const chartContainer = element.querySelector('.cal-grouped-column-chart__chart');

    // Check if an SVG exists inside the chartContainer
    const svgElement = chartContainer ? chartContainer.querySelector('svg') : null;

    let chartImage;
    if (svgElement) {
        // Replace XMLSerializer usage since it's not properly defined in the context
        const svgData = svgElement.outerHTML; // Extract the SVG HTML string directly
        chartImage = document.createElement('img');
        chartImage.src = 'data:image/svg+xml;base64,' + btoa(svgData);
        chartImage.alt = 'Chart'; // Semantic alternative text
    }

    // Extract footer text (chart description or label)
    const footerElement = element.querySelector('.cal-grouped-column-chart__x-axis-name');
    const footerText = footerElement ? footerElement.textContent.trim() : '';

    // Assemble table data dynamically
    const cells = [
        ['Embed'], // Header row matching example
        [chartImage || 'No chart data available', footerText || 'No footer text available'] // Additional content row
    ];

    // Create table block using the helper utility
    const tableBlock = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the newly created table block
    element.replaceWith(tableBlock);
}