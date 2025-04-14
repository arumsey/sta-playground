/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Accordion'];

  const rows = [];

  const sections = element.querySelectorAll('.accordions__toggler');

  // Iterate through each accordion section
  sections.forEach((sectionHeader) => {
    const titleCell = sectionHeader.textContent.trim();

    const contentContainer = sectionHeader.nextElementSibling;
    const contentCell = [];

    if (contentContainer) {
      // Clean up and extract paragraphs
      const paragraphs = contentContainer.querySelectorAll('p');
      paragraphs.forEach((paragraph) => {
        const cleanedParagraph = paragraph.textContent.replace(/\s*&nbsp;\s*/g, '').replace(/\n\s*/g, ' ').trim();
        if (cleanedParagraph) {
          const clonedParagraph = document.createElement('p');
          clonedParagraph.textContent = cleanedParagraph;
          contentCell.push(clonedParagraph);
        }
      });

      // Extract and validate images
      const images = contentContainer.querySelectorAll('img');
      images.forEach((img) => {
        const src = img.getAttribute('src');
        if (src && !contentCell.some((existing) => existing.tagName === 'IMG' && existing.src === src)) {
          const clonedImage = img.cloneNode(true);
          clonedImage.alt = img.alt || 'Image'; // Ensure alt attribute defaults if missing
          contentCell.push(clonedImage);
        }
      });
    } else {
      const emptyContentNotice = document.createElement('p');
      emptyContentNotice.textContent = 'No content available';
      contentCell.push(emptyContentNotice);
    }

    // Push to rows with cleaned data
    rows.push([titleCell, contentCell]);
  });

  const tableData = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  element.replaceWith(blockTable);
}