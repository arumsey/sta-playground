/* global WebImporter */
export default function parse(element, { document }) {
  // Extract footer image dynamically
  const footerImage = element.querySelector('picture img');
  const footerImageElement = footerImage
    ? (() => {
        const img = document.createElement('img');
        img.src = footerImage.src;
        img.alt = footerImage.alt;
        img.width = footerImage.width;
        img.height = footerImage.height;
        return img;
      })()
    : document.createTextNode('No image available');

  // Extract links and format 'Cookie Choices' appropriately
  const linksItems = element.querySelectorAll('ul:nth-of-type(1) li a');
  const linksSet = new Set();
  const linksElements = Array.from(linksItems)
    .filter((link) => {
      const key = link.textContent.trim();
      if (linksSet.has(key)) {
        return false;
      }
      linksSet.add(key);
      return true;
    })
    .map((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      if (link.classList.contains('ot-sdk-show-settings')) {
        // Handle 'Cookie Choices' specifically
        a.textContent = 'Manage Cookie Choices';
      } else {
        a.textContent = link.textContent;
      }
      return a;
    });

  // Extract email dynamically
  const emailInfo = element.querySelector('p a[href^="mailto"]');
  const emailElement = emailInfo
    ? (() => {
        const a = document.createElement('a');
        a.href = emailInfo.href;
        a.textContent = emailInfo.textContent;
        return a;
      })()
    : document.createTextNode('No email available');

  // Extract copyright information dynamically
  const fullText = element.querySelector('p').textContent;
  const copyrightInfoText = emailInfo
    ? fullText.split(emailInfo.textContent)[1]?.trim()
    : fullText.trim();
  const copyrightInfoElement = copyrightInfoText
    ? document.createTextNode(copyrightInfoText)
    : document.createTextNode('No copyright information available');

  // Extract social links dynamically and handle placeholders correctly
  const socialLinks = element.querySelectorAll('ul:nth-of-type(2) li a');
  const socialLinksElements = Array.from(socialLinks).length > 0
    ? Array.from(socialLinks).map((link) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.textContent = link.href;
        return a;
      })
    : [document.createTextNode('No social links available')];

  // Define table structure dynamically
  const cells = [
    ['Columns'],
    [footerImageElement, linksElements],
    [emailElement, copyrightInfoElement],
    socialLinksElements
  ];

  // Create block table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}