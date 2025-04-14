/* global WebImporter */
export default function parse(element, { document }) {
    function createContentCell(header, listItems, link, video, caption) {
        const contentDiv = document.createElement('div');

        // Add header
        if (header) {
            const headerEl = document.createElement('h2');
            headerEl.innerHTML = header; // Preserve formatting like colors and inline HTML
            contentDiv.appendChild(headerEl);
        }

        // Add list of items
        if (listItems.length > 0) {
            const ul = document.createElement('ul');
            listItems.forEach((item) => {
                const li = document.createElement('li');
                li.textContent = item;
                ul.appendChild(li);
            });
            contentDiv.appendChild(ul);
        }

        // Add link
        if (link) {
            const linkEl = document.createElement('a');
            linkEl.href = link.href;
            linkEl.innerHTML = link.text; // Preserve inline styling and formatting
            contentDiv.appendChild(linkEl);
        }

        // Add video and caption
        if (video) {
            const videoDiv = document.createElement('div');
            videoDiv.innerHTML = video.outerHTML; // Preserve iframe structure
            contentDiv.appendChild(videoDiv);

            if (caption) {
                const captionEl = document.createElement('em');
                captionEl.textContent = caption; // Properly formatted caption text
                contentDiv.appendChild(captionEl);
            }
        }

        return contentDiv;
    }

    function extractData(element) {
        const header = element.querySelector('h2 span')?.outerHTML || ''; // Preserve inline styles and formatting
        const listItems = Array.from(element.querySelectorAll('ul li')).map((li) => li.textContent.trim());

        const linkElement = element.querySelector('[href]'); // Target link with href directly
        const link = linkElement
            ? { href: linkElement.getAttribute('href'), text: linkElement.innerHTML.trim() } // Preserve href and inline formatting
            : null;

        const video = element.querySelector('iframe');

        const captionElement = element.querySelector('em span');
        const caption = captionElement ? captionElement.textContent.trim() : ''; // Ensure single <em>

        return { header, listItems, link, video, caption };
    }

    // Extract data from the element
    const { header, listItems, link, video, caption } = extractData(element);

    // Build columns block table
    const cells = [
        ['Columns'], // Header row, matches example exactly
        [
            createContentCell(header, listItems, link, null, null), // First column content
            video ? createContentCell(null, [], null, video, caption) : '', // Second column video with caption
        ],
    ];

    // Handle edge cases for missing content
    if (cells[1].some((cell) => cell)) {
        const blockTable = WebImporter.DOMUtils.createTable(cells, document);
        element.replaceWith(blockTable);
    }
}