/* global WebImporter */
export default function parse(element, { document }) {
    const tableData = [];

    // Add header row
    tableData.push(['Hero']); // Matches the exact header from the example

    // Extract relevant content dynamically
    const image = element.querySelector('img');
    const heading = element.querySelector('h2, h3');
    const paragraphs = Array.from(element.querySelectorAll('p')).filter(p => p.textContent.trim() !== ''); // Filter out empty or irrelevant <p> elements
    const link = element.querySelector('a[href]');

    // Combine extracted elements into the content row
    const content = [];

    if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt || ''; // Handle missing alt attributes
        content.push(imgElement);
    }

    if (heading) {
        const headingElement = document.createElement('h3'); // Use 'h3' for consistency with example
        headingElement.textContent = heading.textContent;
        content.push(headingElement);
    }

    if (paragraphs.length > 0) {
        paragraphs.forEach((paragraph) => {
            const cleanedText = paragraph.textContent.replace(/\u00a0/g, ' ').trim(); // Normalize spaces and trim
            if (cleanedText) {
                const textElement = document.createElement('p');
                textElement.textContent = cleanedText;
                content.push(textElement);
            }
        });
    }

    if (link) {
        const lastParagraph = content[content.length - 1];
        const anchorElement = document.createElement('a');
        anchorElement.href = link.href;
        anchorElement.textContent = link.textContent.trim();
        if (lastParagraph && lastParagraph.tagName === 'P') {
            // Append link to the last paragraph for proper contextual placement
            lastParagraph.appendChild(document.createTextNode(' ')); // Add space before the link
            lastParagraph.appendChild(anchorElement);
        } else {
            // If no suitable paragraph exists, create a new one
            const linkElement = document.createElement('p');
            linkElement.appendChild(anchorElement);
            content.push(linkElement);
        }
    }

    tableData.push([content]);

    // Create and replace the original element with the table block
    const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(tableBlock);
}