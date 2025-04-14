/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const firstColumnContent = [];

  const introParagraph = element.querySelector('.text-center p');
  if (introParagraph) {
    firstColumnContent.push(introParagraph.cloneNode(true));
  }

  const firstColumnImage = element.querySelector('.col-sm-7 img');
  if (firstColumnImage) {
    const imgClone = firstColumnImage.cloneNode(true);
    imgClone.removeAttribute('style'); // Clear undefined styling properties
    firstColumnContent.push(imgClone);
  }

  const firstColumnTextHeader = element.querySelector('.col-sm-7 h5 strong');
  if (firstColumnTextHeader) {
    firstColumnContent.push(firstColumnTextHeader.cloneNode(true));
  }

  const firstColumnListItems = element.querySelectorAll('.col-sm-6 .checks li');
  if (firstColumnListItems.length > 0) {
    const list = document.createElement('ul');
    firstColumnListItems.forEach(item => {
      const cleanedListItem = item.cloneNode(true);
      const spans = cleanedListItem.querySelectorAll('span');
      spans.forEach(span => span.replaceWith(span.textContent)); // Remove unnecessary spans
      list.appendChild(cleanedListItem);
    });
    firstColumnContent.push(list);
  }

  const linkElement = element.querySelector('.col-sm-7 a');
  if (linkElement) {
    firstColumnContent.push(linkElement.cloneNode(true));
  }

  const secondColumnContent = [];

  const secondColumnIntroImage = element.querySelector('.col-sm-5 img');
  if (secondColumnIntroImage) {
    const imgClone = secondColumnIntroImage.cloneNode(true);
    imgClone.removeAttribute('style'); // Clear undefined styling properties
    secondColumnContent.push(imgClone);
  }

  const secondColumnTextHeader = element.querySelector('.col-sm-5 h3 strong');
  if (secondColumnTextHeader) {
    secondColumnContent.push(secondColumnTextHeader.cloneNode(true));
  }

  const secondColumnIntroList = element.querySelector('.col-sm-5 ul');
  if (secondColumnIntroList) {
    const cleanedList = secondColumnIntroList.cloneNode(true);
    const spans = cleanedList.querySelectorAll('span');
    spans.forEach(span => span.replaceWith(span.textContent)); // Remove unnecessary spans
    cleanedList.removeAttribute('style'); // Clean up inline styles
    secondColumnContent.push(cleanedList);
  }

  const cells = [
    headerRow,
    [firstColumnContent, secondColumnContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}