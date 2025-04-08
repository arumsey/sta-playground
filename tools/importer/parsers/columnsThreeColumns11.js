/* global WebImporter */

export default function parse(element, { document }) {

    const tableHeader = ['Columns'];

    // Safely extract the logo information
    const logoElement = element.querySelector('.nav-brand img');
    const logoImage = document.createElement('img');
    if (logoElement) {
        logoImage.src = logoElement.getAttribute('src') || '';
        logoImage.alt = logoElement.getAttribute('alt') || '';
    } else {
        logoImage.textContent = 'No logo found';
    }

    // Safely extract navigation links
    const navLinksParent = element.querySelector('.nav-sections ul');
    const navLinks = [];
    if (navLinksParent) {
        navLinks.push(...Array.from(navLinksParent.querySelectorAll('li a')).map((link) => {
            const anchor = document.createElement('a');
            anchor.href = link.getAttribute('href') || '#';
            anchor.textContent = link.textContent.trim() || 'Unnamed link';
            return anchor;
        }));
    }

    // Safely extract the donate button
    const donateButtonParent = element.querySelector('.nav-tools .button-container .button.primary');
    const donateButton = document.createElement('a');
    if (donateButtonParent) {
        donateButton.href = donateButtonParent.getAttribute('href') || '#';
        donateButton.textContent = donateButtonParent.textContent.trim() || 'Donate';
    } else {
        donateButton.textContent = 'No Donate button found';
    }

    const tableData = [
        [tableHeader],
        [logoImage, navLinks, donateButton],
    ];

    const parsedTable = WebImporter.DOMUtils.createTable(tableData, document);

    element.replaceWith(parsedTable);
}