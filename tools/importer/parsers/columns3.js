/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the heading
  const heading = document.createElement('h2');
  heading.textContent = 'Online Psykolog';

  // Extract the content on the left side
  const leftContent = document.createElement('div');
  const paragraphs = element.querySelectorAll('p');
  const list = element.querySelector('ul');
  const link = element.querySelector('a[href="http://www.prescriba.com/PFA"]');

  paragraphs.forEach((p) => {
    leftContent.appendChild(p.cloneNode(true));
  });

  if (list) {
    leftContent.appendChild(list.cloneNode(true));
  }

  if (link) {
    leftContent.appendChild(link.cloneNode(true));
  }

  // Extract the video content on the right side
  const rightContent = document.createElement('div');
  const iframe = element.querySelector('iframe');
  const caption = element.querySelector('em');

  if (iframe) {
    rightContent.appendChild(iframe.cloneNode(true));
  }

  if (caption) {
    rightContent.appendChild(caption.cloneNode(true));
  }

  // Define table headers and content rows
  const headerRow = ['Columns'];
  const contentRow = [leftContent, rightContent];

  const blockTable = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}