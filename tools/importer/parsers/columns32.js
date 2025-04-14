/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    const contentCells = Array.from(element.querySelectorAll('.col-xs-12')).map((column) => {
        const teaser = column.querySelector('.teasers__teaser');
        if (!teaser) {
            return ['Missing content'];
        }

        // Extract and validate image
        const img = teaser.querySelector('img');
        const imgElement = img ? img : document.createElement('span');
        if (!img || !img.getAttribute('src')) imgElement.textContent = 'No image available';

        // Extract and validate title
        const title = teaser.querySelector('h3');
        const titleElement = title ? title : document.createElement('span');
        titleElement.textContent = title ? title.textContent : 'No title available';

        // Extract and validate description
        const description = teaser.querySelector('p');
        const descriptionElement = description ? description : document.createElement('span');
        descriptionElement.textContent = description ? description.textContent : 'No description available';

        // Combine elements into an array for the cell
        return [
          imgElement,
          titleElement,
          descriptionElement,
        ];
    });

    const cells = [
      headerRow,
      contentCells
    ];

    const block = WebImporter.DOMUtils.createTable(cells, document);

    element.replaceWith(block);
}