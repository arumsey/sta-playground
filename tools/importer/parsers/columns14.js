/* global WebImporter */
export default function parse(element, { document }) {
    // Extract header row
    const headerRow = ['Columns'];

    // Extract logo
    const logoWrapper = element.querySelector('picture');
    const logoImage = logoWrapper.querySelector('img').cloneNode(true);

    // Extract links in the first list
    const linksWrapper = element.querySelectorAll('ul')[0];
    const links = Array.from(linksWrapper.querySelectorAll('li')).map(linkEl => {
        const link = linkEl.querySelector('a');
        return [link ? link.cloneNode(true) : document.createTextNode(linkEl.textContent)];
    });

    // Extract email and copyright information
    const emailWrapper = element.querySelectorAll('p')[1];
    const emailLink = emailWrapper.querySelector('a').cloneNode(true);
    const copyrightText = document.createTextNode(emailWrapper.textContent.replace(emailLink.textContent, '').trim());

    // Organize email and copyright into separate cells
    const emailCell = [emailLink];
    const copyrightCell = [copyrightText];

    // Extract social media links
    const socialLinksWrapper = element.querySelectorAll('ul')[1];
    const socialLinks = Array.from(socialLinksWrapper.querySelectorAll('a')).map(link => [link.cloneNode(true)]);

    // Table structure: rows and cells
    const cells = [
        headerRow,
        [
            [logoImage], // First cell in second row
            ...links,    // Each link is its own cell
            emailCell,   // Email cell
            copyrightCell // Copyright cell
        ],
        socialLinks.map(link => link) // Each social link in its own cell
    ];

    // Create table and replace the original element
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}