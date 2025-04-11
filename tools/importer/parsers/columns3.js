/* global WebImporter */
export default function parse(element, { document }) {
    // Extract the heading
    const heading = element.querySelector('h2') ? element.querySelector('h2').textContent.trim() : '';

    // Extract the image
    const imageElement = element.querySelector('img');
    const image = document.createElement('img');
    if (imageElement) {
        image.src = imageElement.src;
        image.alt = imageElement.alt;
    } else {
        image.alt = 'No image available';
    }

    // Extract the paragraphs
    const paragraphs = Array.from(element.querySelectorAll('.default-content-wrapper p')).map((p) => {
        const div = document.createElement('div');
        div.innerHTML = p.innerHTML.trim();
        return div;
    });

    // Ensure we handle the case where paragraphs may be absent
    const paragraphContent = paragraphs.length > 0 ? paragraphs : ['No content available'];

    // Extract the list items
    const listItems = Array.from(element.querySelectorAll('ul li')).map((li) => {
        const link = li.querySelector('a');
        if (link) {
            const anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.textContent;
            return anchor;
        }
        return null; // Handle case where list item is empty or lacks anchor
    }).filter(Boolean);

    const listDiv = document.createElement('div');
    if (listItems.length > 0) {
        listDiv.append(...listItems);
    } else {
        listDiv.textContent = 'No list items available';
    }

    // Create the table content
    const cells = [
        ['Columns'], // Header row, ensures conformity to the example
        [image, paragraphContent, listDiv],
    ];

    // Create the table block
    const table = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the element
    element.replaceWith(table);
}