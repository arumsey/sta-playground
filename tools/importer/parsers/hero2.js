/* global WebImporter */
 export default function parse(element, { document }) {
    // Extracting the main image from the 'picture' element
    const picture = element.querySelector('picture');
    const imgElement = picture ? picture.querySelector('img') : null;
    const img = imgElement ? document.createElement('img') : null;
    if (imgElement) {
        img.src = imgElement.src;
        img.alt = imgElement.alt || '';
    }

    // Extracting the headline text
    const titleElement = element.querySelector('h1');
    const title = titleElement ? document.createElement('h1') : null;
    if (titleElement) {
        title.textContent = titleElement.textContent;
    }

    // Preparing the table structure
    const headerRow = ['Hero'];
    const contentRow = [img, title].filter(Boolean);

    const cells = [
        headerRow,
        contentRow,
    ];

    // Creating the block table
    const block = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the new block table
    element.replaceWith(block);
}