/* global WebImporter */
export default function parse(element, { document }) {
  // Extract background image
  const backgroundImageStyle = element.querySelector('.panel__image')?.getAttribute('style');
  let backgroundImage = null;
  if (backgroundImageStyle) {
    const matches = backgroundImageStyle.match(/url\(['"]?(.*?)['"]?\)/);
    backgroundImage = matches ? matches[1] : null;
  }

  // Extract title and subheading
  const title = document.createElement('h2'); // Adjusted title tag (h2 instead of h1 based on the HTML)
  title.textContent = element.querySelector('.panel__headline')?.textContent.trim() ?? '';

  let subheadingContent = element.querySelector('.inner.panel__headline');
  const subheading = document.createElement('div');
  if (subheadingContent) {
    subheadingContent.querySelectorAll('.element').forEach((span) => {
      const paragraph = document.createElement('p');
      paragraph.textContent = span.textContent.trim();
      subheading.appendChild(paragraph);
    });
  }

  // Extract call-to-action button
  const ctaElement = element.querySelector('.cta-btn');
  let cta = null;
  if (ctaElement) {
    const ctaText = ctaElement.textContent.trim();
    const ctaLink = ctaElement.closest('a')?.getAttribute('href');
    cta = document.createElement('p');
    const link = document.createElement('a');
    link.textContent = ctaText;
    link.setAttribute('href', ctaLink);
    cta.appendChild(link);
  }

  // Create table rows
  const rows = [
    ['Hero'], // Header row – Ensure specificity matches example headers
    [
      [
        backgroundImage ? Object.assign(document.createElement('img'), { src: backgroundImage }) : '',
        title,
        subheading,
        cta,
      ],
    ],
  ];

  // Create table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace element
  element.replaceWith(blockTable);
}