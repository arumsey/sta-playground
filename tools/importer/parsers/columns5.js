/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns']; // Ensure it matches the example 'Columns' text exactly

  const rows = [];
  const columns = element?.querySelectorAll('.row .col-xs-12') || [];

  if (!columns.length) {
    console.error('No columns found');
    return;
  }

  const extractContent = (elem) => {
    return elem ? elem.textContent.trim() : '';
  };

  const extractImages = (parent) => {
    const images = parent.querySelectorAll('img');
    return Array.from(images).map((img) => {
      const imageElement = document.createElement('img');
      imageElement.src = img.src;
      imageElement.alt = img.alt || '';
      return imageElement;
    });
  };

  const extractIframe = (parent) => {
    const iframe = parent.querySelector('iframe');
    if (iframe) {
      const iframeElement = document.createElement('iframe');
      iframeElement.src = iframe.src;
      iframeElement.width = iframe.width;
      iframeElement.height = iframe.height;
      return iframeElement;
    }
    return null;
  };

  columns.forEach((col) => {
    const teaser = col.querySelector('.teasers__teaser');
    if (teaser) {
      const content = [];

      // Extract title
      const title = teaser.querySelector('h3');
      if (title) {
        content.push(document.createTextNode(extractContent(title)));
      }

      // Extract paragraph
      const paragraph = teaser.querySelector('p');
      if (paragraph) {
        content.push(document.createTextNode(extractContent(paragraph)));
      }

      // Extract images
      const images = extractImages(teaser);
      if (images.length) {
        content.push(...images);
      }

      // Extract iframe
      const iframe = extractIframe(teaser);
      if (iframe) {
        content.push(iframe);
      }

      if (content.length > 0) {
        rows.push(content); // Add only non-empty rows
      }
    }
  });

  rows.unshift(headerRow); // Add header row at the top

  const blockTable = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(blockTable);
}