/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Cards (no images)'];

    let rows = [];
    // Extract relevant content from the input element
    const heading = element.querySelector('h2');
    if (heading) {
        rows.push([heading.textContent.trim()]);
    }

    const paragraphs = element.querySelectorAll('p');
    paragraphs.forEach((p) => {
        rows.push([p.cloneNode(true)]);
    });

    const ctaContainer = element.querySelector('.col-xs-12.text-center');
    if (ctaContainer) {
        const ctaLink = ctaContainer.querySelector('a.cta-btn');
        if (ctaLink) {
            rows.push([ctaLink.cloneNode(true)]);
        }
    }

    // Compose the table with header
    const cells = [headerRow, ...rows];

    // Create and replace the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}