/* global WebImporter */

export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Helper function to clean nodes by removing unnecessary styling and empty elements
  const cleanNode = (node) => {
    const clonedNode = node.cloneNode(true);
    clonedNode.removeAttribute('style');
    if (clonedNode.querySelectorAll('p:empty').length > 0) {
      clonedNode.querySelectorAll('p:empty').forEach((emptyP) => emptyP.remove());
    }
    return clonedNode;
  };

  // Left content extraction
  const leftContent = document.createElement('div');

  const mainHeading = element.querySelector('h2:not([style*="display:none"])');
  if (mainHeading) {
    leftContent.appendChild(cleanNode(mainHeading));
  }

  const paragraphs = element.querySelectorAll('.teasers__teaser p');
  paragraphs.forEach((p) => {
    if (p.textContent.trim().length > 0) {
      leftContent.appendChild(cleanNode(p));
    }
  });

  const unorderedLists = element.querySelectorAll('ul');
  unorderedLists.forEach((ul) => {
    leftContent.appendChild(cleanNode(ul));
  });

  const accordion = element.querySelector('.accordions__toggler');
  if (accordion) {
    leftContent.appendChild(cleanNode(accordion));
  }

  // Right content extraction
  const rightContent = document.createElement('div');

  const videoElement = element.querySelector('iframe');
  if (videoElement) {
    rightContent.appendChild(cleanNode(videoElement));
  }

  const videoCaption = element.querySelector('em');
  if (videoCaption) {
    rightContent.appendChild(cleanNode(videoCaption));
  }

  // Construct table data
  const cells = [
    headerRow,
    [leftContent, rightContent],
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}