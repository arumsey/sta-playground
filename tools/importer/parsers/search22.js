/* global WebImporter */
export default function parse(element, { document }) {
  // Define the cells for the table
  const cells = [
    ['Search'],
    ['https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json'],
  ];

  // Create the table using the defined cells
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the newly created table
  element.replaceWith(table);
}
