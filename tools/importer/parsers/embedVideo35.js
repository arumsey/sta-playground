/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [];

  // Add the exact header row as specified in the example
  const headerRow = ['Embed'];
  cells.push([headerRow]);

  // Process each section in the HTML
  element.querySelectorAll('.row').forEach((row) => {
    const leftSection = [];
    const rightSection = [];

    // Left column content
    const leftColumn = row.querySelector('.col-xs-12.col-sm-6:first-child .teasers__teaser');
    if (leftColumn) {
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = leftColumn.innerHTML.trim();
      leftSection.push(contentDiv);
    }

    // Right column content (video or image)
    const rightColumn = row.querySelector('.col-xs-12.col-sm-6:nth-child(2)');
    if (rightColumn) {
      const video = rightColumn.querySelector('iframe');
      const image = rightColumn.querySelector('img');
      const caption = rightColumn.querySelector('em') ? rightColumn.querySelector('em').textContent.trim() : null;

      // Add video URL
      if (video) {
        const videoLink = document.createElement('a');
        videoLink.href = video.src;
        videoLink.textContent = video.src;
        rightSection.push(videoLink);
      }

      // Add image
      if (image) {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        rightSection.push(imgElement);
      }

      // Add caption
      if (caption) {
        const captionElement = document.createElement('p');
        captionElement.textContent = caption;
        rightSection.push(captionElement);
      }
    }

    // Check and add sections as distinct rows in the table
    if (leftSection.length > 0) cells.push([leftSection]);
    if (rightSection.length > 0) cells.push([rightSection]);
  });

  // Create table using createTable helper function
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table
  element.replaceWith(blockTable);
}