/* global WebImporter */
export default function parse(element, { document }) {
  // Extract columns from the input HTML structure
  const columns = element.querySelectorAll('.ct01__column');

  // Process each column, extract content dynamically
  const columnContents = Array.from(columns).map(col => {
    const wrapper = col.querySelector('.ct01__wrapper');

    if (!wrapper) return '';

    const richTextElement = wrapper.querySelector('.b02__rich-text');
    const statisticElement = wrapper.querySelector('.b16__text');
    const richText = richTextElement ? richTextElement.innerHTML.trim() : '';
    const statistic = statisticElement ? statisticElement.textContent.trim() : '';

    let content = '';
    if (richText && statistic) {
      const combinedContent = document.createElement('div');
      const richTextDiv = document.createElement('div');
      richTextDiv.innerHTML = richText;
      const statisticDiv = document.createElement('p');
      statisticDiv.textContent = statistic;

      combinedContent.appendChild(richTextDiv);
      combinedContent.appendChild(statisticDiv);
      content = combinedContent;
    } else if (richText) {
      const richTextDiv = document.createElement('div');
      richTextDiv.innerHTML = richText;
      content = richTextDiv;
    } else if (statistic) {
      const statisticDiv = document.createElement('p');
      statisticDiv.textContent = statistic;
      content = statisticDiv;
    }

    return content;
  });

  // Ensure content fits within the correct table structure
  const headerRow = ['Columns'];

  // The content row contains the three extracted columns' content
  const dataRow = columnContents;

  // Create the table with the header and data rows
  const tableStructure = [
    headerRow,
    dataRow
  ];

  const blockTable = WebImporter.DOMUtils.createTable(tableStructure, document);

  // Replace the original content with the new table block
  element.replaceWith(blockTable);

  return blockTable;
}