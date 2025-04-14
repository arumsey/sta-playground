/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Quote'];

  // Extract the quote text
  const quoteElement = element.querySelector('h1.teasers__teaser');
  const quoteText = document.createElement('blockquote');
  if (quoteElement) {
    quoteText.innerHTML = quoteElement.innerHTML;
  } else {
    quoteText.innerHTML = ''; // Handle missing quote text
  }

  // Extract the attribution content
  const attributionElement = element.querySelector('div.teasers__teaser span');
  const attributionLinkElement = element.querySelector('a.cta-btn');

  const attributionContent = document.createElement('div');
  if (attributionElement) {
    attributionContent.innerHTML = attributionElement.innerHTML;
  }
  if (attributionLinkElement) {
    const link = document.createElement('a');
    link.href = attributionLinkElement.href;
    link.className = attributionLinkElement.className;
    link.innerHTML = attributionLinkElement.innerHTML;
    attributionContent.append(link);
  }

  // Create the table cells for the block
  const cells = [
    headerRow,
    [quoteText],
    [attributionContent],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}