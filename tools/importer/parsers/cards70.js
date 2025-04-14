/* global WebImporter */
 export default function parse(element, { document }) {
  // Step 1: Define the table header row
  const headerRow = ['Cards'];

  // Step 2: Initialize the rows array with the header row
  const rows = [headerRow];

  // Step 3: Select all card container elements
  const cards = element.querySelectorAll('.anchor.col-sm-6.col-md-4');

  // Step 4: Iterate over each card to extract details dynamically
  cards.forEach(card => {
    const imageDiv = card.querySelector('.panel__image');
    const imageUrl = imageDiv && imageDiv.style.backgroundImage ? imageDiv.style.backgroundImage.match(/url\('(.*?)'\)/)?.[1] : '';
    const image = document.createElement('img');
    if (imageUrl) {
      image.src = imageUrl;
    }

    const bodyDiv = card.querySelector('.panel__body');
    const title = bodyDiv.querySelector('.panel__headline');
    const titleText = title ? title.textContent.trim() : '';

    const ctaSpan = bodyDiv.querySelector('span.cta-btn');
    const ctaText = ctaSpan ? ctaSpan.textContent.trim() : '';
    const ctaLink = card.querySelector('a') ? card.querySelector('a').getAttribute('href') : '';

    const titleElement = document.createElement('h3');
    titleElement.textContent = titleText;

    let ctaElement = null;
    if (ctaText && ctaLink) {
      ctaElement = document.createElement('a');
      ctaElement.textContent = ctaText;
      ctaElement.href = ctaLink;
    }

    const content = ctaElement ? [titleElement, ctaElement] : [titleElement];

    rows.push([
      image,
      content
    ]);
  });

  // Step 5: Create the table using the helper function
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Step 6: Replace the original element with the new block table
  element.replaceWith(blockTable);
}