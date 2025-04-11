/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const cards = Array.from(element.querySelectorAll('h3')).map((heading) => {
    // Extract image element if it exists
    const imageContainer = heading.previousElementSibling;
    const image = imageContainer ? imageContainer.querySelector('img') : null;

    // Extract text content
    const paragraphElem = heading.nextElementSibling;
    const paragraphText = paragraphElem ? paragraphElem.textContent.trim() : '';

    // Prepare the image element
    let imgElem = null;
    if (image) {
      imgElem = document.createElement('img');
      imgElem.setAttribute('src', image.src);
      imgElem.setAttribute('alt', image.alt);
    }

    // Prepare the title element
    const titleElem = document.createElement('strong');
    titleElem.textContent = heading.textContent;

    // Combine title and paragraph with proper spacing
    const contentCell = document.createElement('div');
    contentCell.appendChild(titleElem);
    contentCell.appendChild(document.createElement('br')); // Add spacing
    contentCell.appendChild(document.createTextNode(paragraphText));

    // Return the card row
    return [imgElem, contentCell];
  });

  // Compile rows for the table
  const cells = [headerRow, ...cards];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  
  // Replace the target element with the new table block
  element.replaceWith(block);
}