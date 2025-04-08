/* global WebImporter */
export default function parse(element, { document }) {
    // Extract image
    const imageElement = element.querySelector('img');
    let imageCell;
    if (imageElement) {
        const img = document.createElement('img');
        img.src = imageElement.src;
        img.alt = imageElement.alt;
        imageCell = img;
    }

    // Extract links
    const linksElement = element.querySelectorAll('ul li a');
    const linksCell = Array.from(linksElement).map(link => {
        const linkWrapper = document.createElement('div');
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        linkWrapper.appendChild(a);
        return linkWrapper;
    });

    // Extract other text content
    const footerTextElement = element.querySelector('p a');
    let footerTextCell;
    if (footerTextElement) {
        const footerWrapper = document.createElement('div');
        const footerLink = document.createElement('a');
        footerLink.href = footerTextElement.href;
        footerLink.textContent = footerTextElement.textContent;
        footerWrapper.appendChild(footerLink);
        footerWrapper.append(` ${footerTextElement.parentElement.textContent.replace(footerTextElement.textContent, '')}`);
        footerTextCell = footerWrapper;
    }

    // Assemble table rows
    const headerRow = ['Columns'];
    const contentRow = [imageCell, linksCell];
    const footerRow = [footerTextCell];

    const tableData = [headerRow, contentRow, footerRow];

    // Create table and replace element
    const tableBlock = WebImporter.DOMUtils.createTable(tableData, document);
    element.replaceWith(tableBlock);
}