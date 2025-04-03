/* global WebImporter */

export default function parse(element, { document }) {
  // Dynamically ensure header row contains EXACTLY one column
  const headerRow = ['Columns'];

  // Extract content dynamically from the HTML
  const column1 = [];

  // Extract image and dynamically set width/height
  const image = element.querySelector('.b04__img');
  if (image) {
    const img = document.createElement('img');
    img.src = image.getAttribute('src');
    img.alt = image.getAttribute('alt');
    img.width = parseInt(image.getAttribute('width'), 10) || image.naturalWidth || 278; // Default width fallback
    img.height = parseInt(image.getAttribute('height'), 10) || image.naturalHeight || 278; // Default height fallback
    column1.push(img);
  }

  // Extract buttons
  const buttons = element.querySelectorAll('.b03__button a');
  buttons.forEach((button) => {
    const link = document.createElement('a');
    link.href = button.getAttribute('href');
    link.textContent = button.textContent.trim();
    column1.push(link);
  });

  // Extract ADS image if present and dynamically set dimensions
  const adsImage = element.querySelector('.b04__img-cover');
  if (adsImage && !adsImage.src.includes('blank')) {
    const img = document.createElement('img');
    img.src = adsImage.getAttribute('src');
    img.alt = adsImage.getAttribute('alt');
    img.width = parseInt(adsImage.getAttribute('width'), 10) || adsImage.naturalWidth || 48; // Default width fallback
    img.height = parseInt(adsImage.getAttribute('height'), 10) || adsImage.naturalHeight || 48; // Default height fallback
    column1.push(img);
  }

  const column2 = [];

  const headline = element.querySelector('.b01__headline.twtr-type--headline-md.twtr-color--gray-900');
  if (headline) {
    const h2 = document.createElement('h2');
    h2.textContent = headline.textContent.trim();
    column2.push(h2);
  }

  const bodyContent = element.querySelectorAll('.b02__rich-text.twtr-scribe-clicks-within .b02__type--large p');
  bodyContent.forEach((paragraph) => {
    const p = document.createElement('p');
    p.innerHTML = paragraph.innerHTML.trim();
    column2.push(p);
  });

  const column3 = [];

  const details = element.querySelectorAll('.b02__type--xlarge');
  details.forEach((detail) => {
    const h6 = detail.querySelector('h6');
    const p = detail.querySelector('p');

    const detailGroup = [];
    if (h6) {
      const title = document.createElement('h6');
      title.textContent = h6.textContent.trim();
      detailGroup.push(title);
    }
    if (p) {
      const value = document.createElement('p');
      value.innerHTML = p.innerHTML.trim();
      detailGroup.push(value);
    }

    const detailDiv = document.createElement('div');
    detailDiv.append(...detailGroup);
    column3.push(detailDiv);
  });

  const cells = [
    headerRow,
    [column1, column2, column3],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}