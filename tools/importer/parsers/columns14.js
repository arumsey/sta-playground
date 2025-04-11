/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Extract logo image from the footer block
    const imageElement = element.querySelector('img');
    const image = document.createElement('img');
    image.src = imageElement?.src || '';
    image.alt = imageElement?.alt || '';

    // Extract text links from second section (includes PDF links etc.)
    const textLinks = Array.from(element.querySelectorAll('div:nth-of-type(2) ul li a')).map(a => {
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent;
        return link;
    });
    const textLinksContainer = document.createElement('div');
    textLinks.forEach(link => textLinksContainer.appendChild(link));

    // Extract footer email text and copyright
    const finalText = element.querySelector('div:nth-of-type(2) p');
    const emailAndCopyright = document.createElement('p');
    emailAndCopyright.innerHTML = finalText?.innerHTML || '';

    // Extract social media links from the third section
    const socialLinksElements = Array.from(element.querySelectorAll('div:nth-of-type(3) ul li a')).map(a => {
        const link = document.createElement('a');
        link.href = a.href;
        link.textContent = a.textContent;
        return link;
    });
    const socialLinksContainer = document.createElement('div');
    socialLinksElements.forEach(link => socialLinksContainer.appendChild(link));

    // Create two-column block table
    const cells = [
        headerRow,
        [
            [textLinksContainer, emailAndCopyright],
            [image, socialLinksContainer]
        ]
    ];

    const blockTable = WebImporter.DOMUtils.createTable(cells, document);

    // Replace original element with the new block table
    element.replaceWith(blockTable);
}