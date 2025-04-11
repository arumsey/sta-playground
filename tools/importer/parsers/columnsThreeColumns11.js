/* global WebImporter */
export default function parse(element, { document }) {
  const cells = [
    ['Columns'], // Header row exactly matches the example block type
    [
      createColumn(['Column 1', 'This and that', createImage('./media_193050d52a802830d970fde49644ae9a504a61b7f.png#width=750&height=500', document)], document),
      createColumn(['Column 2', 'This and that', createImage('./media_18267d0ca999ad38c3e21d388a0e820952e8448dc.jpeg#width=750&height=516', document)], document),
      createColumn(['Column 3', 'This and that', createImage('./media_1063af6164c583aec9bc9089712790e86135b5af0.jpeg#width=750&height=525', document)], document),
    ],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}

function createColumn(content, document) {
  const colElements = [];
  content.forEach((value) => {
    if (typeof value === 'string') {
      const paragraph = document.createElement('p');
      paragraph.textContent = value;
      colElements.push(paragraph);
    } else {
      colElements.push(value);
    }
  });
  return colElements;
}

function createImage(src, document) {
  const img = document.createElement('img');
  img.src = src;
  return img;
}