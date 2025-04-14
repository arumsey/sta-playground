/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Hero'];

  // Extract image
  const img = element.querySelector('img');
  const image = img ? document.createElement('img') : null;
  if (image) {
    image.src = img.src;
    image.alt = img.alt;
    image.width = img.width || 750;
    image.height = img.height || 415;
  }

  // Extract heading
  const headingEl = element.querySelector('h3, h5');
  const heading = headingEl ? document.createElement('h3') : null;
  if (heading) {
    heading.textContent = headingEl.textContent.trim();
  }

  // Extract paragraph
  const paragraphEl = element.querySelector('p');
  const paragraph = paragraphEl ? document.createElement('p') : null;
  if (paragraph) {
    paragraph.innerHTML = paragraphEl.innerHTML.trim();
  }

  // Extract CTA link
  const ctaLinkEl = element.querySelector('a.cta-btn');
  const ctaLink = ctaLinkEl ? document.createElement('a') : null;
  if (ctaLink) {
    ctaLink.href = ctaLinkEl.href;
    ctaLink.target = ctaLinkEl.target;
    ctaLink.textContent = ctaLinkEl.textContent.trim();
  }

  // Combine all content into a single cell for the second row
  const secondRowContent = [];
  if (image) secondRowContent.push(image);
  if (heading) secondRowContent.push(heading);
  if (paragraph) secondRowContent.push(paragraph);
  if (ctaLink) secondRowContent.push(ctaLink);

  const cells = [
    headerRow,
    [secondRowContent] // Entire content combined into a single cell
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(blockTable);
}