/* global WebImporter */
export default function parse(element, { document }) {
    // Correct header row with bold text
    const headerRow = [document.createElement('strong')];
    headerRow[0].textContent = 'Columns';

    // Extract fundraising section content
    const fundraisingContainer = element.querySelector('.default-content-wrapper');
    const heading = fundraisingContainer.querySelector('h2');
    const image = fundraisingContainer.querySelector('picture img');
    const paragraphs = [...fundraisingContainer.querySelectorAll('p')];

    const contentBlock = document.createElement('div');
    if (heading) {
        contentBlock.appendChild(heading.cloneNode(true));
    }
    paragraphs.forEach(paragraph => {
        contentBlock.appendChild(paragraph.cloneNode(true));
    });

    // Tournament data rows extracted properly
    const tournamentWrapper = element.querySelector('.tournament-wrapper');
    const tournaments = tournamentWrapper.querySelectorAll('div[data-block-name="tournament"] > div');

    const tournamentRows = Array.from(tournaments).map(tournament => {
        const tournamentDiv = document.createElement('div');
        Array.from(tournament.children).forEach(detail => {
            tournamentDiv.appendChild(detail.cloneNode(true));
        });
        return [tournamentDiv];
    });

    // Create table cells to match output structure
    const cells = [
        headerRow,
        [contentBlock, image.cloneNode(true)],
        ...tournamentRows
    ];

    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
}