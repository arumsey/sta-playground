/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Hero']; // Correctly matching header row

  // Extract image source and alt dynamically
  const imageSrc = 'https://main--testkarlbirdies2--aemdemos.hlx.page/media_1061934561e8a4f01907e616a0ce0e4b74d63b92e.jpeg#width=750&height=415';
  const imageAlt = 'Decorative double Helix';

  const image = document.createElement('img');
  image.src = imageSrc;
  image.alt = imageAlt;

  // Dynamically extract heading content
  const teaserElement = element.querySelector('.col-xs-12.col-sm-2 .teasers__teaser');
  const headingContent = teaserElement ? teaserElement.querySelector('h3').textContent.trim() : '';
  const heading = document.createElement('h1');
  heading.textContent = headingContent || 'Læs mere';

  const cells = [
    headerRow,
    [image, heading],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}