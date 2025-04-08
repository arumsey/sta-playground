/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  // Extract the image from the first div
  const imageContainer = element.querySelector('picture');
  const image = imageContainer ? imageContainer.cloneNode(true) : '';

  // Extract links and content from the second div
  const linksContainer = element.querySelector('ul');
  const links = linksContainer ? Array.from(linksContainer.querySelectorAll('li')).map(link => {
    const anchor = link.querySelector('a');
    const linkElement = document.createElement('div');
    if (anchor) {
      const innerAnchor = document.createElement('a');
      innerAnchor.href = anchor.href;
      innerAnchor.textContent = anchor.textContent;
      linkElement.appendChild(innerAnchor);
      linkElement.appendChild(document.createElement('br')); // Add line break for readability
    }
    return linkElement;
  }) : '';

  const linksDiv = document.createElement('div');
  linksDiv.append(...links);

  // Extract final paragraph from the second div
  const footerParagraph = element.querySelector('p:last-of-type');
  const footerText = footerParagraph ? footerParagraph.textContent.trim() : '';

  // Include footer text in a structured format
  const footerDiv = document.createElement('div');
  footerDiv.textContent = footerText;

  // Extract social links from the third div
  const socialLinksContainer = element.querySelectorAll('div:nth-of-type(3) ul li a');
  const socialLinks = socialLinksContainer ? Array.from(socialLinksContainer).map(link => {
    const socialElement = document.createElement('div');
    socialElement.append(link.cloneNode(true));
    socialElement.appendChild(document.createElement('br')); // Add line break for readability
    return socialElement;
  }) : '';

  const socialDiv = document.createElement('div');
  socialDiv.append(...socialLinks);

  // Construct the table
  const cells = [
    headerRow,
    [image, linksDiv],
    [footerDiv, socialDiv]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}