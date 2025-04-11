/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero'];

    // Extract the heading
    const heading = element.querySelector('h2');
    const headingClone = document.createElement('h2');
    headingClone.textContent = heading ? heading.textContent : '';

    // Collect paragraphs
    const paragraphs = Array.from(element.querySelectorAll('p:not(.button-container)')).map(p => {
        const paraClone = document.createElement('p');
        paraClone.innerHTML = p.innerHTML; // Preserve links and formatting
        return paraClone;
    });

    // Extract CTA button
    const buttonContainer = element.querySelector('.button-container a');
    const buttonClone = document.createElement('p');
    if (buttonContainer) {
        const buttonLink = document.createElement('a');
        buttonLink.href = buttonContainer.href;
        buttonLink.title = buttonContainer.title;
        buttonLink.textContent = buttonContainer.textContent;
        buttonClone.appendChild(buttonLink);
    }

    // Structure rows logically
    const contentRow = [
        headingClone,
        ...paragraphs,
        buttonClone
    ];

    // Construct cells for the block table
    const cells = [
        headerRow,
        [contentRow]
    ];

    // Create the block table using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element
    element.replaceWith(block);
}