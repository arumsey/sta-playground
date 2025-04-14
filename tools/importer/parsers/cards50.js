/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cards = [...element.querySelectorAll('.teasers__teaser')].map((teaser) => {
    const image = teaser.querySelector('img');
    const video = teaser.querySelector('iframe');
    const title = teaser.querySelector('p span');
    const description = teaser.querySelector('p');
    const link = teaser.querySelector('a');

    const mediaElement = image || video;

    const contentElements = [];
    if (title) {
      const titleElement = document.createElement('strong');
      titleElement.textContent = title.textContent.trim();
      contentElements.push(titleElement);
    }

    if (description) {
      const descriptionText = description.childNodes[0]?.textContent?.trim();
      if (descriptionText) {
        const descriptionElement = document.createElement('p');
        descriptionElement.textContent = descriptionText;
        contentElements.push(descriptionElement);
      }
    }

    if (link) {
      const linkElement = document.createElement('a');
      linkElement.href = link.href;
      linkElement.target = link.target;
      linkElement.textContent = link.textContent.trim();
      contentElements.push(linkElement);
    }

    return [mediaElement, contentElements];
  });

  const cells = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}