/* global WebImporter */ 
export default function parse(element, { document }) {
  // Extract background image
  const imageElement = element.querySelector('.panel__image');
  const backgroundImage = imageElement ? imageElement.style.backgroundImage : '';
  const imageURLMatch = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
  const imageURL = imageURLMatch ? imageURLMatch[1] : '';
  const image = document.createElement('img');
  if (imageURL) {
    image.src = imageURL;
  }

  // Extract heading and subheading
  const headingElement = element.querySelector('h2.panel__headline');
  const heading = headingElement ? headingElement.innerHTML : '';

  // Extract carousel items
  const carouselElements = element.querySelectorAll('.carousel .element');
  const carouselItems = carouselElements.length > 0
    ? Array.from(carouselElements).map(item => item.textContent.trim())
    : [];
  const carouselContainer = document.createElement('div');
  carouselItems.forEach(item => {
    const itemElement = document.createElement('span');
    itemElement.textContent = item;
    carouselContainer.appendChild(itemElement);
  });

  // Extract call-to-action
  const ctaElement = element.querySelector('.cta-btn');
  const ctaText = ctaElement ? ctaElement.textContent.trim() : '';
  const ctaLink = element.href;
  const cta = document.createElement('a');
  if (ctaText && ctaLink) {
    cta.href = ctaLink;
    cta.textContent = ctaText;
  }

  // Combine contents into a single cell for the second row
  const combinedContent = document.createElement('div');
  if (imageURL) combinedContent.appendChild(image);
  if (heading) {
    const headingElement = document.createElement('h1');
    headingElement.innerHTML = heading;
    combinedContent.appendChild(headingElement);
  }
  if (carouselItems.length > 0) combinedContent.appendChild(carouselContainer);
  if (ctaText && ctaLink) combinedContent.appendChild(cta);

  // Create table cells
  const cells = [
    ['Hero'],
    [combinedContent]
  ];

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}