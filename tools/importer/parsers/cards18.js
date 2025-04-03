/* global WebImporter */

export default function parse(element, { document }) {
    // Ensure "document.createElement" exists to avoid runtime errors
    if (!document || typeof document.createElement !== 'function') {
        throw new TypeError('Invalid document object or missing createElement method');
    }

    // Helper function to extract card data from partner elements
    function extractCardData(partner) {
        // Build image element
        const image = partner.querySelector('.sp07__media img');
        const imageElement = document.createElement('img');
        if (image) {
            imageElement.src = image.src;
            imageElement.alt = image.alt || '';
            imageElement.title = image.title || '';
        }

        // Build content cell
        const contentCell = [];

        const title = partner.querySelector('.sp07__headline');
        if (title) {
            const titleElement = document.createElement('h3');
            titleElement.textContent = title.textContent.trim();
            contentCell.push(titleElement);
        }

        const description = partner.querySelector('.sp07__copy p');
        if (description) {
            contentCell.push(description.textContent.trim());
        }

        const cta = partner.querySelector('.sp07__cta-copy a');
        if (cta) {
            const ctaElement = document.createElement('a');
            ctaElement.href = cta.href;
            ctaElement.textContent = cta.textContent.trim();
            contentCell.push(ctaElement);
        }

        return [imageElement, contentCell];
    }

    // Extract partner elements
    const partners = Array.from(element.querySelectorAll('.sp05__partner'));

    // Fix: Ensure header row is formatted exactly as per the example
    const headerRow = ['Cards']; // Single-column header

    // Build rows from partner data
    const rows = partners.map((partner) => extractCardData(partner));

    // Create a table using WebImporter utility
    const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);

    // Replace the original element with the constructed table
    element.replaceWith(table);
}