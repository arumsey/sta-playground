/* global WebImporter */
export default function parse(element, { document }) {
    // Extract information from the HTML element
    const sectionWrapper = element.querySelector('.default-content-wrapper');
    const cardsContainer = element.querySelector('.cards-wrapper ul');

    // Extract the heading and description text
    const heading = sectionWrapper.querySelector('h2')?.textContent.trim() || '';
    const descriptionParagraphs = Array.from(sectionWrapper.querySelectorAll('p')).map(p => p.textContent.trim());
    const description = descriptionParagraphs.join(' ');

    // Extract individual cards information
    const cards = Array.from(cardsContainer.querySelectorAll('li')).map((card) => {
        const imageElement = card.querySelector('picture img');
        const image = document.createElement('img');
        image.src = imageElement.getAttribute('src');
        image.alt = imageElement.getAttribute('alt') || '';

        const title = card.querySelector('.cards-card-body a')?.textContent.trim() || '';

        const heading = document.createElement('h3');
        heading.textContent = title;

        return [image, document.createElement('br'), heading];
    });

    // Construct table data
    const headerRow = ['Columns'];

    // Ensure cards are placed in separate cells in contentRow
    const contentRow = cards.map(card => card);

    // Create table using WebImporter.DOMUtils.createTable
    const table = WebImporter.DOMUtils.createTable([headerRow, [...contentRow]], document);

    // Replace the original element with the new table
    element.replaceWith(table);
}