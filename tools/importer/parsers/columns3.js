/* global WebImporter */
export default function parse(element, { document }) {
  // Extract header row matching EXACTLY to 'Columns'
  const headerRow = ['Columns'];

  // Extract heading element dynamically
  const headingElement = element.querySelector('h2');
  const heading = document.createElement('h2');
  heading.textContent = headingElement ? headingElement.textContent : '';

  // Dynamically extract the image element
  const pictureElement = element.querySelector('picture img');
  let imgElement = document.createElement('img');
  if (pictureElement) {
    imgElement.src = pictureElement.getAttribute('src');
    imgElement.alt = pictureElement.getAttribute('alt');
    imgElement.width = pictureElement.width;
    imgElement.height = pictureElement.height;
  } else {
    imgElement = null; // No image exists
  }

  // Extract paragraphs dynamically
  const paragraphs = element.querySelectorAll('p');
  const firstParagraph = document.createElement('p');
  firstParagraph.textContent = paragraphs[1] ? paragraphs[1].textContent : '';

  const secondParagraph = document.createElement('p');
  secondParagraph.innerHTML = paragraphs[2] ? paragraphs[2].innerHTML : '';

  // Extract list items dynamically
  const listElement = element.querySelector('ul');
  let listContainer = document.createElement('ul');
  if (listElement) {
    const listItems = listElement.querySelectorAll('li');
    listItems.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = item.innerHTML;
      listContainer.appendChild(listItem);
    });
  } else {
    listContainer = null; // No list items exist
  }

  // Define the table rows dynamically from content
  const cells = [
    headerRow,
    [heading, imgElement].filter(Boolean), // Filter to avoid null images
    [firstParagraph, secondParagraph].filter(Boolean),
    [listContainer].filter(Boolean)
  ];

  // Create the block table using WebImporter.DOMUtils.createTable()
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the existing element with the formatted block table
  element.replaceWith(block);
}