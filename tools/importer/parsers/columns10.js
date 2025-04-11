/* global WebImporter */
export default function parse(element, { document }) {
    const navBrand = element.querySelector('.nav-brand');
    const brandImg = navBrand.querySelector('img');

    const brandContent = document.createElement('div');
    if (brandImg) {
        brandContent.append(brandImg);
    }

    const navSections = element.querySelector('.nav-sections');
    const navLinks = navSections ? Array.from(navSections.querySelectorAll('li')).map((li) => li.querySelector('a')) : [];

    const linksContent = document.createElement('ul');
    navLinks.forEach((link) => {
        const li = document.createElement('li');
        if (link) {
            li.append(link);
        }
        linksContent.append(li);
    });

    const navTools = element.querySelector('.nav-tools');
    const donateButton = navTools ? navTools.querySelector('a.button') : document.createElement('a');

    const cells = [
        ['Columns'],
        [brandContent, linksContent, donateButton],
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(block);
}