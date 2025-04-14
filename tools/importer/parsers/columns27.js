/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to safely extract text content and avoid errors
  const safeText = (el) => (el ? el.textContent.trim() : '');

  // Extract tab names dynamically from the tabs container
  const tabs = Array.from(
    element.querySelectorAll('.mat-tab-label .mat-tab-label-content')
  ).map((tab) => safeText(tab));

  const headerRow = ['Columns'];

  // Create the first section dynamically
  const firstSection = document.createElement('div');
  const list = document.createElement('ul');
  tabs.forEach((tab) => {
    const li = document.createElement('li');
    li.textContent = tab;
    list.appendChild(li);
  });
  const liveLink = document.createElement('a');
  liveLink.textContent = 'Live';
  liveLink.href = 'https://word-edit.officeapps.live.com/';
  firstSection.append(list, liveLink);

  // Create placeholder images for the example
  const greenImage = document.createElement('img');
  greenImage.src = 'green-double-helix.jpg'; // Placeholder image source
  greenImage.alt = '';   // Add alt text if available

  const yellowImage = document.createElement('img');
  yellowImage.src = 'yellow-double-helix.jpg'; // Placeholder image source
  yellowImage.alt = '';  // Add alt text if available

  // Create the second section dynamically
  const secondSection = document.createElement('div');
  secondSection.textContent = 'Or you can just view the preview';
  const previewLink = document.createElement('a');
  previewLink.textContent = 'Preview';
  previewLink.href = 'https://word-edit.officeapps.live.com/';
  secondSection.appendChild(previewLink);

  const cells = [
    headerRow,
    [firstSection, greenImage],
    [yellowImage, secondSection]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}