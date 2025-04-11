/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to extract the image URL from the img tag
  const getImageUrl = (picture) => {
    const source = picture.querySelector('source');
    const img = picture.querySelector('img');
    return source ? source.srcset : img ? img.src : '';
  };

  const headerRow = ['Columns'];

  // Extract content from the cards
  const cards = [...element.querySelectorAll('.cards-wrapper .cards li')].map((cardElement) => {
    const picture = cardElement.querySelector('picture');
    const imageUrl = getImageUrl(picture);

    const imgElement = document.createElement('img');
    imgElement.src = imageUrl;

    const cardBody = cardElement.querySelector('.cards-card-body strong a');
    const titleElement = document.createElement('h3');
    titleElement.innerHTML = `<a href="${cardBody.href}" title="${cardBody.title}">${cardBody.textContent}</a>`;

    return [imgElement, titleElement, document.createTextNode('')];
  });

  // Create table
  const cells = [
    headerRow,
    ...cards
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}