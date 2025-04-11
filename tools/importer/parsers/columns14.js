/* global WebImporter */
export default function parse(element, { document }) {
    // Correct header row with proper structure
    const headerRow = ['Columns block'];

    // Preparing content for the columns

    // First column: Image
    const firstColumnContent = [];
    const picture = element.querySelector('picture img');
    if (picture) {
        firstColumnContent.push(picture.cloneNode(true));
    }

    // Second column: Links and email (excluding social media links)
    const secondColumnContent = [];
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
        // Safely access href attribute and exclude social media links
        const href = link.getAttribute('href');
        if (href && !href.includes('facebook') && !href.includes('twitter') && !href.includes('instagram')) {
            secondColumnContent.push(link.cloneNode(true));
        }
    });

    // Third column: Social media links
    const thirdColumnContent = [];
    const socialLinks = element.querySelectorAll('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"]');
    socialLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (href) {
            thirdColumnContent.push(link.cloneNode(true));
        }
    });

    // Combine columns into rows
    const rows = [
        headerRow, 
        [firstColumnContent, secondColumnContent.length ? secondColumnContent : ['No links found'], thirdColumnContent.length ? thirdColumnContent : ['No social media links found']],
    ];

    // Create and replace the table
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
}