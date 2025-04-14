/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all relevant columns content
  const columns = Array.from(element.querySelectorAll('.col-xs-12.col-sm-4')).map((col) => {
    const heading = col.querySelector('h3')?.textContent.trim() || '';
    const paragraphs = Array.from(col.querySelectorAll('p')).map(p => p.textContent.trim()).join('<br>');
    const links = Array.from(col.querySelectorAll('a')).map(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.textContent;
        return a;
    });

    const cellContent = document.createElement('div');
    cellContent.innerHTML = `<strong>${heading}</strong><br>${paragraphs}`;
    cellContent.append(...links);
    return cellContent;
  });

  // Create structured block table
  const headerRow = ['Columns'];
  const block = WebImporter.DOMUtils.createTable([headerRow, columns], document);

  // Replace original element with the block
  element.replaceWith(block);
}