/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure table header matches example correctly
  const headerRow = ['Cards'];
  const rows = [];

  // Select panels dynamically
  element.querySelectorAll('.panel').forEach((panel) => {
    let image = null, title = null, description = null, cta = null;

    // Extract the image URL dynamically
    const imageStyle = panel.querySelector('.panel__image')?.style.backgroundImage;
    if (imageStyle) {
      const imageUrl = imageStyle.match(/url\("(.*?)"\)/)?.[1];
      if (imageUrl) {
        image = document.createElement('img');
        image.src = imageUrl;
      }
    }

    // Extract title text content dynamically and normalize line breaks and spaces
    const headlineElement = panel.querySelector('.panel__headline');
    if (headlineElement) {
      title = document.createElement('h2');
      title.textContent = headlineElement.textContent.replace(/\s+/g, ' ').trim();
    }

    // Extract description dynamically from kicker
    const descriptionElement = panel.querySelector('.panel__kicker');
    if (descriptionElement) {
      description = document.createElement('p');
      description.textContent = descriptionElement.textContent.trim();
    }

    // Extract Call-to-Action dynamically
    const ctaElement = panel.querySelector('.cta-btn');
    if (ctaElement) {
      cta = document.createElement('a');
      cta.href = panel.href;
      cta.textContent = ctaElement.textContent.trim();
    }

    // Handle special panel types (PFA Nyheder and Nyttige Links)
    const newsList = panel.querySelector('.panel__news-list');
    if (newsList) {
      const items = Array.from(newsList.querySelectorAll('li')).map((item) => {
        return item.textContent.trim().replace(/\s+/g, ' ');
      });
      description = document.createElement('ul');
      items.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        description.appendChild(li);
      });
    }

    const linksList = panel.querySelector('.panel__list');
    if (linksList) {
      const items = Array.from(linksList.querySelectorAll('li')).map((link) => {
        const href = link.querySelector('a')?.href;
        const text = link.textContent.trim().replace(/\s+/g, ' ');
        const linkElement = document.createElement('a');
        linkElement.href = href;
        linkElement.textContent = text;
        return linkElement;
      });
      description = document.createElement('div');
      items.forEach((linkElement) => {
        description.appendChild(linkElement);
      });
    }

    // Combine extracted elements into content cells
    const contentCells = [];
    if (title) contentCells.push(title);
    if (description) contentCells.push(description);
    if (cta) contentCells.push(cta);

    // Ensure image is always present or empty without 'null'
    rows.push([image || document.createElement('div'), contentCells]);
  });

  // Create and replace the table using WebImporter
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}