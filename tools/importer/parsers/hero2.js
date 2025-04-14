/* global WebImporter */
export default function parse(element, { document }) {
    const createTable = WebImporter.DOMUtils.createTable;

    const panels = element.querySelector('.row.panels');

    if (!panels) {
        return;
    }

    const cells = [];

    // Header row
    const headerRow = ['Hero']; // Fix: Ensure header matches example exactly
    cells.push(headerRow);

    const panelBody = panels.querySelector('.panel__body');
    const panelImage = panels.querySelector('.panel__image');
    const stickyBar = panels.querySelector('.module-sticky-cta-bar');
    const stickyCta = panels.querySelector('.sticky-cta');

    const content = [];

    // Extract panel image background URL
    if (panelImage && panelImage.style.backgroundImage) {
        const urlMatch = panelImage.style.backgroundImage.match(/url\("(.*?)"\)/);
        if (urlMatch && urlMatch[1]) {
            const img = document.createElement('img');
            img.src = urlMatch[1];
            content.push(img);
        }
    }

    // Extract panel kicker and headline
    if (panelBody) {
        const kicker = panelBody.querySelector('.panel__kicker');
        const headline = panelBody.querySelector('.panel__headline');

        if (kicker) {
            const title = document.createElement('h5');
            title.textContent = kicker.textContent.trim();
            content.push(title);
        }

        if (headline) {
            const heading = document.createElement('h1');
            heading.textContent = headline.textContent.trim();
            content.push(heading);
        }
    }

    // Extract sticky CTA Bar content
    if (stickyBar) {
        const text = stickyBar.querySelector('.module-sticky-cta-bar-text');
        const btn = stickyBar.querySelector('.module-sticky-cta-bar-btn a');

        if (text) {
            const paragraph = document.createElement('p');
            paragraph.textContent = text.textContent.trim();
            content.push(paragraph); // Fix: Properly add paragraph content
        }

        if (btn && btn.href) {
            const link = document.createElement('a');
            link.href = btn.href;
            link.textContent = btn.textContent.trim();
            content.push(link); // Fix: Properly add link content
        }
    }

    // Extract sticky CTA content
    if (stickyCta) {
        const textContainer = stickyCta.querySelector('.sticky-cta__inner__text');
        const ctaLink = stickyCta.querySelector('a.cta-btn');

        if (textContainer) {
            const stickyTitle = textContainer.querySelector('h5');
            const stickyDescription = textContainer.querySelector('p');

            if (stickyTitle) {
                const stickyTitleElement = document.createElement('h5');
                stickyTitleElement.textContent = stickyTitle.textContent.trim();
                content.push(stickyTitleElement);
            }

            if (stickyDescription) {
                const stickyDescriptionElement = document.createElement('p');
                stickyDescriptionElement.textContent = stickyDescription.textContent.trim();
                content.push(stickyDescriptionElement);
            }
        }

        if (ctaLink && ctaLink.href) {
            const ctaAnchor = document.createElement('a');
            ctaAnchor.href = ctaLink.href;
            ctaAnchor.textContent = ctaLink.textContent.trim();
            content.push(ctaAnchor); // Fix: Properly add CTA link content
        }
    }

    // Add content row
    cells.push([content]);

    // Create the block table
    const blockTable = createTable(cells, document);

    // Replace the element with the block table
    element.replaceWith(blockTable);
}