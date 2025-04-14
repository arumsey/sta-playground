/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to safely extract element text content
  const extractText = (el) => (el ? el.textContent.trim() : '');

  // Extract teasers content
  const teasers = Array.from(element.querySelectorAll('.teasers__teaser'));

  // Generate table rows based on teaser content
  const extractedColumns = teasers.map((teaser) => {
    const img = teaser.querySelector('img');
    const imgElement = img ? document.createElement('img') : null;
    if (imgElement) {
      imgElement.src = img.src;
      imgElement.alt = img.alt;
    }

    const title = document.createElement('h2');
    title.textContent = extractText(teaser.querySelector('h2'));

    const descriptionParagraphs = Array.from(
      teaser.querySelectorAll('p > span')
    ).map((span) => extractText(span))
    .filter(Boolean)
    .map((text) => {
      const p = document.createElement('p');
      p.textContent = text;
      return p;
    });

    const linkElement = teaser.querySelector('a.cta-btn');
    const link = linkElement ? document.createElement('a') : null;
    if (link) {
      link.href = linkElement.href;
      link.textContent = extractText(linkElement);
    }

    return [title, ...descriptionParagraphs, link, imgElement];
  });

  const headerRow = ['Columns']; // Fix header issue

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    extractedColumns
  ], document);

  // Replace the original element with the new block table
  element.replaceWith(table);
}