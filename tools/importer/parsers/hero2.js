/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Hero']; // Block type header row indicating this is a Hero block

    // Extract background image URL
    const panelImageDiv = element.querySelector('.panel__image');
    const imageUrl = panelImageDiv ? panelImageDiv.style.backgroundImage.slice(5, -2) : '';
    const backgroundImage = imageUrl ? document.createElement('img') : null;
    if (backgroundImage) {
        backgroundImage.src = imageUrl;
    }

    // Extract headline (mandatory)
    const headlineElement = element.querySelector('.panel__headline');
    const headline = headlineElement ? document.createElement('h1') : null;
    if (headlineElement && headline) {
        headline.textContent = headlineElement.textContent.trim();
    }

    // Extract sticky call-to-action text and link (optional)
    const ctaBarElement = element.querySelector('.module-sticky-cta-bar');
    const ctaText = ctaBarElement ? ctaBarElement.querySelector('.module-sticky-cta-bar-text')?.textContent.trim() : '';
    const ctaLinkElement = ctaBarElement ? ctaBarElement.querySelector('a') : null;
    const ctaLink = ctaLinkElement ? document.createElement('a') : null;
    if (ctaLinkElement && ctaLink) {
        ctaLink.textContent = ctaLinkElement.textContent.trim();
        ctaLink.href = ctaLinkElement.href.trim();
    }

    // Construct content row (2nd row of the block table)
    const contentRow = [];
    if (backgroundImage) contentRow.push(backgroundImage);
    if (headline) contentRow.push(headline);
    if (ctaText || ctaLink) {
        const ctaWrapper = document.createElement('div');
        if (ctaText) {
            const ctaTextElement = document.createElement('p');
            ctaTextElement.textContent = ctaText;
            ctaWrapper.appendChild(ctaTextElement);
        }
        if (ctaLink) {
            ctaWrapper.appendChild(ctaLink);
        }
        contentRow.push(ctaWrapper);
    }

    // Create table rows for the block table
    const cells = [
        headerRow, // First row with block type header only
        [contentRow] // Second row with extracted and structured content
    ];

    // Create block table using WebImporter.DOMUtils.createTable
    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace the original element with the block table
    element.replaceWith(blockTable);
}