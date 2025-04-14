/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row indicating the type of block
  const headerRow = ['Columns'];

  // Extract content dynamically from the element
  const listSection = element.querySelector('.cal-column--lg-35 h4');
  const listItems = element.querySelectorAll('.cal-row mat-radio-button .mat-radio-label-content');

  const list = document.createElement('ul');
  listItems.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.textContent = item.textContent.trim();
    list.appendChild(listItem);
  });
  const liveButton = document.createElement('a');
  liveButton.textContent = 'Live';
  liveButton.href = 'https://word-edit.officeapps.live.com/';

  const previewSection = element.querySelector('.mat-body');
  const previewText = document.createElement('p');
  previewText.textContent = previewSection ? previewSection.textContent.trim() : 'Preview content unavailable';
  const previewButton = document.createElement('a');
  previewButton.textContent = 'Preview';
  previewButton.href = 'https://word-edit.officeapps.live.com/';

  const previewCell = document.createElement('div');
  previewCell.append(previewText, previewButton);

  // Extract images dynamically (stub logic for now based on example screenshots)
  const yellowHelixImage = document.createElement('img');
  yellowHelixImage.src = 'https://dummy-url-to-yellow-dna.com';
  yellowHelixImage.alt = 'Yellow Double Helix';

  const greenHelixImage = document.createElement('img');
  greenHelixImage.src = 'https://dummy-url-to-green-dna.com';
  greenHelixImage.alt = 'Green Double Helix';

  // Construct cells
  const cells = [
    headerRow,
    [list, greenHelixImage],
    [yellowHelixImage, previewCell],
  ];

  const blockTable = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(blockTable);
}