/* global WebImporter */
export default function parse(element, { document }) {
  // Assemble header row exactly as per the example
  const headerRow = ['Columns'];

  // Extract columns content
  const columns = Array.from(element.querySelectorAll('.col-md-4')).map((column) => {
    // Extract header
    const header = column.querySelector('.footer__heading')?.textContent?.trim() || 'No Header';
    
    // Extract links
    const links = Array.from(column.querySelectorAll('ul.footer__list li a')).map((link) => {
      const a = document.createElement('a');
      a.href = link.href;
      a.textContent = link.textContent.trim() || 'No links available';
      return a;
    });

    // Handle edge cases for missing links or content
    if (links.length === 0) {
      const noLinks = document.createElement('p');
      noLinks.textContent = 'No links available';
      links.push(noLinks);
    }

    // Create column structure
    const col = document.createElement('div');
    const colHeader = document.createElement('p');
    colHeader.textContent = header;
    col.appendChild(colHeader);
    links.forEach((link) => col.appendChild(link));

    return col;
  });

  // Extract contact section
  const contactSection = element.querySelector('.col-xs-landscape-6.col-sm-6.col-md-3');
  const contactHeader = contactSection?.querySelector('.footer__heading')?.textContent?.trim() || 'Contact Information';
  const address = contactSection?.querySelector('address')?.innerHTML?.trim() || 'Address not available';
  const socials = Array.from(contactSection.querySelectorAll('dl.share dd a')).map((socialLink) => {
    const a = document.createElement('a');
    a.href = socialLink.href;
    a.textContent = socialLink.textContent.trim() || 'No social links available';
    return a;
  });

  // Handle missing social links
  if (socials.length === 0) {
    const noSocials = document.createElement('p');
    noSocials.textContent = 'No social links available';
    socials.push(noSocials);
  }

  // Create contact column structure
  const contactDiv = document.createElement('div');
  const contactHeaderElem = document.createElement('p');
  contactHeaderElem.textContent = contactHeader;
  const addressElem = document.createElement('div');
  addressElem.innerHTML = address;
  contactDiv.appendChild(contactHeaderElem);
  contactDiv.appendChild(addressElem);
  socials.forEach((social) => contactDiv.appendChild(social));

  // Assemble table data
  const cells = [
    headerRow, // Header Row
    columns,   // Content columns row
    [contactDiv], // Contact row
  ];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element
  element.replaceWith(block);
}