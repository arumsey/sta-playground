/* global WebImporter */
export default function parse(element, { document }) {
  // Define the block header row
  const headerRow = ['Cards (no images)'];

  // Extract dynamic content from the provided element
  const contentRows = [];

  // Extract and handle the title
  const titleElement = element.querySelector('h2');
  if (titleElement) {
    const title = titleElement.textContent.trim();
    const titleParagraph = document.createElement('p');
    titleParagraph.innerHTML = `<strong>${title}</strong>`; // Adding emphasis for the title
    contentRows.push([titleParagraph]);
  }

  // Extract and handle the description, ensuring escape characters like '&nbsp;' are removed
  const descriptionElement = element.querySelector('p:not(.accordions__toggler)');
  if (descriptionElement) {
    const description = descriptionElement.innerHTML.replace(/&nbsp;/g, ' ').trim(); // Replace escape characters with spaces
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.innerHTML = description;
    contentRows.push([descriptionParagraph]);
  }

  // Extract additional dynamic content (e.g., accordions) and format each paragraph for multiline description
  const accordionElement = element.querySelector('.accordion__element');
  if (accordionElement) {
    const accordionContent = accordionElement.innerHTML.replace(/&nbsp;/g, ' ').trim();
    const accordionParagraph = document.createElement('p');
    accordionParagraph.innerHTML = accordionContent.replace(/<br\s*\/?>(?=\S)/g, '<br>'); // Handle proper line breaks
    contentRows.push([accordionParagraph]);
  }

  // Build the table structure
  const tableData = [headerRow, ...contentRows];
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new structured block table
  element.replaceWith(blockTable);
}