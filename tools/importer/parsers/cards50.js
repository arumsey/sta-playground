/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards'];

  const rows = Array.from(element.querySelectorAll('.teasers__teaser')).map(teaser => {
    const imageElement = teaser.querySelector('img');
    let image = null;
    if (imageElement) {
      image = document.createElement('img');
      image.src = imageElement.src;
    } else {
      const iframeElement = teaser.querySelector('iframe');
      if (iframeElement) {
        image = document.createElement('iframe');
        image.src = iframeElement.src;
      }
    }

    const textSection = teaser.querySelector('p');
    const heading = textSection ? textSection.querySelector('span') : null;

    const textContent = document.createElement('div');
    if (heading) {
      const headingElement = document.createElement('h3');
      headingElement.textContent = heading.textContent;
      textContent.appendChild(headingElement);
    }

    if (textSection) {
      const description = Array.from(textSection.childNodes).find(node => node.nodeType === 3);
      if (description) {
        const descElement = document.createElement('p');
        descElement.textContent = description.textContent.trim();
        textContent.appendChild(descElement);
      }

      const link = textSection.querySelector('a');
      if (link) {
        const linkElement = document.createElement('a');
        linkElement.href = link.href;
        linkElement.textContent = link.textContent;
        textContent.appendChild(linkElement);
      }
    }

    return [image, textContent];
  });

  const cells = [headerRow, ...rows];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}