/* global WebImporter */
export default function parse(element, { document }) {
  const rows = [];

  // Add header row
  rows.push(['Accordion']);

  // Find all accordion togglers and their content
  const togglers = element.querySelectorAll('.accordions__toggler');
  const elements = element.querySelectorAll('.accordions__element');

  if (!togglers.length || !elements.length) {
    console.warn('No accordion elements found');
    return;
  }

  togglers.forEach((toggler, index) => {
    const title = toggler.textContent.trim();
    const contentElement = elements[index];
    
    if (contentElement) {
      const contentItems = [];

      // Collect all child nodes of the content element
      contentElement.querySelectorAll('.teasers__teaser > p, .teasers__teaser > ul').forEach((child) => {
        contentItems.push(child);
      });

      if (contentItems.length === 0) {
        console.warn(`No content found for accordion item: ${title}`);
      }

      rows.push([title, contentItems]);
    } else {
      console.warn(`No matching content element for toggler: ${title}`);
    }
  });

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the generated table
  element.replaceWith(table);
}