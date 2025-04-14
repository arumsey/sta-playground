/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row based on the example structure.
  const headerRow = ['Columns'];

  // Retrieve all sections.
  const sections = Array.from(element.querySelectorAll('.teasers__teaser'));

  // Convert each section into structured cell content.
  const contentRow = sections.map((section) => {
    const cellElements = [];

    // Extract the image (if available).
    const img = section.querySelector('img');
    if (img) {
      const imgElement = document.createElement('img');
      imgElement.src = img.src;
      imgElement.alt = img.alt;
      cellElements.push(imgElement);
    }

    // Extract the heading (if available).
    const heading = section.querySelector('h3');
    if (heading) {
      const headingElement = document.createElement('strong');
      headingElement.textContent = heading.textContent.trim();
      cellElements.push(headingElement);
    }

    // Extract the paragraph (if available).
    const paragraph = section.querySelector('p');
    if (paragraph && paragraph.textContent.trim()) {
      const paragraphElement = document.createElement('p');
      paragraphElement.textContent = paragraph.textContent.trim();
      cellElements.push(paragraphElement);
    }

    // Extract the list (if available).
    const list = section.querySelector('ol') || section.querySelector('ul');
    if (list) {
      cellElements.push(list.cloneNode(true));
    }

    // Extract the link (if available).
    const link = section.querySelector('a');
    if (link) {
      const linkElement = link.cloneNode(true);
      cellElements.push(linkElement);
    }

    // Wrap all elements in a container div.
    const cellContainer = document.createElement('div');
    cellContainer.setAttribute('style', 'padding: 10px;');
    cellElements.forEach((element) => cellContainer.appendChild(element));

    return cellContainer;
  });

  // Construct the table.
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table.
  element.replaceWith(table);
}