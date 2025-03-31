/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Columns'];

  const contentRows = []; // Will hold the individual columns.

  // Extract 'Contact us' section.
  const contactUsSection = element.querySelector('.nuv-contact-us-CTA__contactus');
  const contactUsTitle = contactUsSection?.querySelector('.nuv-contact-us-CTA__contactus-title')?.textContent.trim();
  const contactUsButtonLink = contactUsSection?.querySelector('.nuv-contact-us-CTA__button a')?.getAttribute('href');
  const contactUsButtonText = contactUsSection?.querySelector('.nuv-contact-us-CTA__button a')?.textContent.trim();

  const contactUsContent = document.createElement('div');
  if (contactUsTitle) {
    const titleElement = document.createElement('p');
    titleElement.textContent = contactUsTitle;
    contactUsContent.appendChild(titleElement);
  }
  if (contactUsButtonLink && contactUsButtonText) {
    const buttonElement = document.createElement('a');
    buttonElement.setAttribute('href', contactUsButtonLink);
    buttonElement.textContent = contactUsButtonText;
    contactUsContent.appendChild(buttonElement);
  }
  contentRows.push([contactUsContent]);

  // Extract 'Financial professionals' section.
  const financialSection = element.querySelector('.nuv-contact-us-CTA__Contact1');
  const financialTitle = financialSection?.querySelector('.nuv-contact-us-CTA__Contact-title')?.textContent.trim();
  const financialItems = financialSection?.querySelectorAll('.nuv-contact-us-CTA__Contact-item a');

  const financialContent = document.createElement('div');
  if (financialTitle) {
    const titleElement = document.createElement('p');
    titleElement.textContent = financialTitle;
    financialContent.appendChild(titleElement);
  }
  if (financialItems && financialItems.length > 0) {
    financialItems.forEach((item) => {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', item.getAttribute('href'));
      linkElement.textContent = item.textContent.trim();
      financialContent.appendChild(linkElement);
    });
  }
  contentRows.push([financialContent]);

  // Extract 'Individual investors' section.
  const individualSection = element.querySelector('.nuv-contact-us-CTA__Contact2');
  const individualTitle = individualSection?.querySelector('.nuv-contact-us-CTA__Contact-title')?.textContent.trim();
  const individualItems = individualSection?.querySelectorAll('.nuv-contact-us-CTA__Contact-item a');

  const individualContent = document.createElement('div');
  if (individualTitle) {
    const titleElement = document.createElement('p');
    titleElement.textContent = individualTitle;
    individualContent.appendChild(titleElement);
  }
  if (individualItems && individualItems.length > 0) {
    individualItems.forEach((item) => {
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', item.getAttribute('href'));
      linkElement.textContent = item.textContent.trim();
      individualContent.appendChild(linkElement);
    });
  }
  contentRows.push([individualContent]);

  // Create the structured block table.
  const cells = [headerRow, ...contentRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the structured block.
  element.replaceWith(block);
}
