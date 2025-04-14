/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Columns'];

  const extractColumnContent = (column) => {
    const heading = column.querySelector('.footer__heading');
    const listItems = [...column.querySelectorAll('.footer__list li a')];

    const listContent = document.createElement('ul');
    listItems.forEach((link) => {
      const liElement = document.createElement('li');
      liElement.appendChild(link.cloneNode(true));
      listContent.appendChild(liElement);
    });

    const columnContent = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('p');
      headingElement.textContent = heading.textContent;
      columnContent.appendChild(headingElement);
    }
    if (listItems.length > 0) {
      columnContent.appendChild(listContent);
    }
    return columnContent;
  };

  const extractSocialLinks = (socialElement) => {
    const heading = socialElement.querySelector('.footer__heading');
    const address = socialElement.querySelector('address');

    const socialLinks = [...socialElement.querySelectorAll('dl.share.share--footer dd a')].map((anchor) => (
      anchor.cloneNode(true)
    ));

    const socialContent = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('p');
      headingElement.textContent = heading.textContent;
      socialContent.appendChild(headingElement);
    }
    if (address) {
      socialContent.appendChild(address.cloneNode(true));
    }
    socialLinks.forEach((link) => {
      socialContent.appendChild(link);
    });

    return socialContent;
  };

  const columnsSection = element.querySelector('.col-xs-landscape-6.col-sm-6.col-md-9 > .row');
  const socialSection = element.querySelector('.col-xs-landscape-6.col-sm-6.col-md-3');

  const columnContents = columnsSection
    ? Array.from(columnsSection.children).map(extractColumnContent)
    : [];
  const socialLinksContent = socialSection ? extractSocialLinks(socialSection) : [];

  // Build rows properly, with one cell per row containing separated column content
  const cells = [
    headerRow, // Header row
    columnContents.map((content) => [content]),
    [socialLinksContent],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}