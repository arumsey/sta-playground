/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const rows = [];

  // Process each column of content inside `nuv-content-feed__feed-items-container`
  const columns = element.querySelectorAll(".nuv-content-feed__feed-item");
  columns.forEach((column) => {
    // Extract image
    const imageContainer = column.querySelector(".nuv-content-feed__feed-item-thumb img");
    const image = imageContainer ? imageContainer.cloneNode(true) : null;

    // Extract eyebrow text
    const eyebrow = column.querySelector(".nuv-content-feed__feed-eyebrow");
    const eyebrowText = eyebrow ? eyebrow.textContent.trim() : '';

    // Extract title and create link
    const title = column.querySelector(".nuv-content-feed__feed-main-title-url");
    const titleLink = title ? document.createElement("a") : '';
    if (titleLink) {
      titleLink.href = title.href;
      titleLink.textContent = title.textContent.trim();
    }

    // Extract sub-title content
    const subTitle = column.querySelector(".nuv-content-feed__feed-sub-title");
    const subtitleContent = subTitle ? subTitle.innerHTML.trim() : '';

    // Ensure rows consistently contain 3 aligned columns
    rows.push([
      image || '',
      eyebrowText || '',
      titleLink || subtitleContent || '',
    ]);
  });

  // Creating the table block
  const cells = [
    headerRow,
    ...rows,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
