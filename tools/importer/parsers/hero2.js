/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the picture element dynamically
  const picture = element.querySelector('picture img');
  const backgroundImage = picture ? `<img src="${picture.getAttribute('src')}" alt="${picture.getAttribute('alt') || ''}" loading="${picture.getAttribute('loading') || 'lazy'}" width="${picture.getAttribute('width')}" height="${picture.getAttribute('height')}" />` : '';

  // Extract heading dynamically
  const heading = element.querySelector('h1');
  const title = heading ? document.createElement('h1') : null;
  if (title) title.textContent = heading.textContent.trim();

  // Create dynamic wrapper for cells
  const wrapperDiv = document.createElement('div');
  if (backgroundImage) wrapperDiv.innerHTML = backgroundImage;
  if (title) wrapperDiv.appendChild(title);

  // Define table structure with header row exactly matching example
  const cells = [
    ['Hero'], // Header row matches exactly
    [wrapperDiv] // Content row includes extracted elements
  ];

  // Create the table block using utility method
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with this block
  element.replaceWith(block);
}