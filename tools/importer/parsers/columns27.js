/* global WebImporter */
export default function parse(element, { document }) {
  // Define the header row as per the example, ensuring it matches exactly
  const headerRow = ['Columns'];

  // Dynamically extract tab labels and concatenate into a single string
  const labelsContainer = element.querySelector('.mat-tab-labels');
  const labels = labelsContainer ? Array.from(labelsContainer.children).map(label => {
    const content = label.querySelector('.mat-tab-label-content');
    return content ? content.textContent.trim() : ''; // Handle missing content dynamically
  }) : [];
  const concatenatedLabels = labels.join(', '); // Combine all labels into a single column

  // Assemble the rows for the output table
  const rows = [headerRow, [concatenatedLabels]];

  // Create the table block using the helper function and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);

  element.replaceWith(block);
}