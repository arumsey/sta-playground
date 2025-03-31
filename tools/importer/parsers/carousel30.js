/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Extract carousel items from element
  const carouselItems = element.querySelectorAll('.slick-track .slick-slide');
  const tableRows = [['Carousel']]; // Initialize with block name

  carouselItems.forEach((slide) => {
    const contentContainer = slide.querySelector('.nuv-featured-card__content-container');

    // Dynamically fetch image
    const fundTicker = contentContainer?.dataset?.fundTicker || "";
    const imageElement = document.createElement('img');
    imageElement.src = fundTicker ? `https://main--sta-boilerplate--aemdemos.hlx.page/media_${fundTicker}.jpeg` : '';

    const content = [];

    // Extract title element
    const titleElement = contentContainer?.querySelector('h4.nuv-featured-card__content-title');
    if (titleElement) {
      const title = document.createElement('h2');
      title.textContent = titleElement.textContent;
      content.push(title);
    }

    // Extract data points
    const dataPoints = contentContainer?.querySelectorAll('.nuv-featured-card__fund-details-data-point-item');
    if (dataPoints) {
        dataPoints.forEach((dataPoint) => {
        const eyebrow = dataPoint.querySelector('.nuv-featured-card__fund-details-data-point-eyebrow')?.textContent || '';
        const valueElement = dataPoint.querySelector('.nuv-featured-card__fund-details-data-point-text span');
        const value = valueElement ? valueElement.textContent : '';
        const disclosureDateElement = dataPoint.querySelector('.nuv-featured-card__fund-details-data-point-disclosure span span');
        const disclosureDate = disclosureDateElement ? disclosureDateElement.textContent : '';

        if (eyebrow && value) {
          const paragraph = document.createElement('p');
          paragraph.textContent = `${eyebrow}: ${value} (As of: ${disclosureDate})`;
          content.push(paragraph);
        }
      });
    }

    // Extract Call-to-Action link
    const linkElement = contentContainer?.querySelector('a.nuv-featured-card');
    if (linkElement) {
      const cta = document.createElement('a');
      cta.textContent = 'Learn More';
      cta.href = linkElement.href;
      content.push(cta);
    }

    // Append extracted row
    tableRows.push([imageElement, content]);
  });

  // Generate table
  const blockTable = createTable(tableRows, document);

  // Replace the original element
  element.replaceWith(blockTable);
}
