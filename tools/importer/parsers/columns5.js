/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns']; // Ensure header row matches example: "Columns"

    // Dynamically extract nav brand image
    const navBrandImage = element.querySelector('.nav-brand picture img')?.cloneNode(true);

    // Extract navigation links and clone them for later use
    const navLinks = Array.from(element.querySelectorAll('.nav-sections ul li a')).map(link => link.cloneNode(true));

    // Extract donate button if present
    const donateButton = element.querySelector('.button-container .button')?.cloneNode(true);

    // Handle missing or empty elements gracefully
    const cells = [
        headerRow,
        [
            navBrandImage || document.createTextNode(''), // Fallback to empty text node if image is missing
            navLinks.length > 0 ? navLinks : [document.createTextNode('')], // Fallback to empty text node if links are missing
            donateButton || document.createTextNode('') // Fallback to empty text node if button is missing
        ]
    ];

    // Create structured table block
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with new structured block
    element.replaceWith(table);
}