/* global WebImporter */
export default function parse(element, { document }) {
  // Extract image src and alt
  const imgElement = element.querySelector('img');
  const imageSrc = imgElement ? imgElement.src : '';
  const imageAlt = imgElement ? imgElement.alt : '';

  // Extract title
  const titleElement = element.querySelector('.nuv-page-breaker__breaker-title');
  const title = titleElement ? titleElement.textContent.trim() : '';

  // Extract subheading
  const subheadingElement = element.querySelector('.nuv-page-breaker__breaker-copy');
  const subheading = subheadingElement ? subheadingElement.textContent.trim() : '';

  // Extract call-to-action
  const ctaElement = element.querySelector('.cta');
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';
  const ctaLink = ctaElement ? ctaElement.href : '';

  // Create table cells
  const headerRow = ['Hero'];
  const contentRow = [];

  // Create a wrapper to combine all content into one cell
  const wrapper = document.createElement('div');

  // Add image
  if (imageSrc) {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    wrapper.appendChild(img);
  }

  // Add title
  if (title) {
    const titleHeading = document.createElement('h1');
    titleHeading.textContent = title;
    wrapper.appendChild(titleHeading);
  }

  // Add subheading
  if (subheading) {
    const subheadingParagraph = document.createElement('p');
    subheadingParagraph.textContent = subheading;
    wrapper.appendChild(subheadingParagraph);
  }

  // Add call-to-action
  if (ctaText && ctaLink) {
    const ctaAnchor = document.createElement('a');
    ctaAnchor.href = ctaLink;
    ctaAnchor.textContent = ctaText;
    wrapper.appendChild(ctaAnchor);
  }

  // Add the wrapper as a single cell in the content row
  contentRow.push(wrapper);

  // Create the block
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
