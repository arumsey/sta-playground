/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row
  const headerRow = ['Cards'];

  // Extract teaser elements dynamically
  const teasers = element.querySelectorAll('.teasers__teaser');

  // Map teasers into rows for the table
  const cards = Array.from(teasers).map((teaser) => {
    // Extract image
    const imgElement = teaser.querySelector('img');
    const image = document.createElement('img');
    if (imgElement) {
      image.src = imgElement.src;
      image.alt = imgElement.alt || '';
    }

    // Extract title
    const titleElement = teaser.querySelector('h3');
    const title = document.createElement('h3');
    if (titleElement) {
      title.textContent = titleElement.textContent;
    }

    // Extract description
    const descriptionElement = teaser.querySelectorAll('p')[0];
    const description = descriptionElement ? descriptionElement.cloneNode(true) : document.createElement('p');

    // Extract additional info and CTA (Call-to-Action)
    const durationElement = teaser.querySelectorAll('p')[1];
    const duration = durationElement ? durationElement.cloneNode(true) : document.createElement('p');

    const ctaLinks = Array.from(teaser.querySelectorAll('a')).map((cta) => {
      const ctaLink = document.createElement('a');
      ctaLink.href = cta.href;
      ctaLink.target = '_blank';
      ctaLink.textContent = cta.textContent.trim();
      return ctaLink;
    });

    // Combine content
    const contentCell = document.createElement('div');
    if (title) contentCell.appendChild(title);
    if (description) contentCell.appendChild(description);
    if (duration) contentCell.appendChild(duration);
    ctaLinks.forEach((link) => contentCell.appendChild(link));

    return [image, contentCell];
  });

  // Construct the table
  const tableData = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the existing element with the block
  element.replaceWith(block);
}