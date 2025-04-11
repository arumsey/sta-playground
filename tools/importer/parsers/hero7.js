/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the heading
    const headingElement = element.querySelector('h1');
    let heading = '';
    if (headingElement) {
        heading = headingElement.textContent.trim();
    }

    // Extract the image
    const imgElement = element.querySelector('picture img');
    let image = '';
    if (imgElement) {
        image = imgElement.getAttribute('src');
    }

    // Create table cells structure
    const cells = [
        // Header row (block type)
        ['Hero'],
        // Content row with elements
        [
            (() => {
                const wrapper = document.createElement('div');

                // Add image if exists
                if (image) {
                    const img = document.createElement('img');
                    img.setAttribute('src', image);
                    img.setAttribute('alt', '');
                    wrapper.appendChild(img);
                }

                // Add heading if exists
                if (heading) {
                    const h1 = document.createElement('h1');
                    h1.textContent = heading;
                    wrapper.appendChild(h1);
                }

                return wrapper;
            })()
        ]
    ];

    // Create table
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element
    element.replaceWith(table);
}