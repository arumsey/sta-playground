/* global WebImporter */

export default function parse(element, { document }) {
    // Extract logo image
    const navBrand = element.querySelector('.nav-brand');
    const logo = navBrand.querySelector('img, picture');

    // Extract navigation links
    const navSections = element.querySelector('.nav-sections');
    const navLinks = Array.from(navSections.querySelectorAll('li > a')).map(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent.trim();
        return a;
    });

    // Extract button
    const navTools = element.querySelector('.nav-tools');
    const donateButton = navTools.querySelector('a.button.primary');
    const buttonElement = document.createElement('a');
    buttonElement.href = donateButton?.href ?? '';
    buttonElement.textContent = donateButton?.textContent.trim() ?? 'Button';

    // Build header row
    const headerRow = ['Columns'];

    // Build first content row
    const firstContent = [navLinks];

    // Build second content row with logo image and button
    const secondContent = [logo, buttonElement];

    // Create block using WebImporter.DOMUtils.createTable
    const block = WebImporter.DOMUtils.createTable([headerRow, firstContent, secondContent], document);

    // Replace original element
    element.replaceWith(block);
}