/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to create table cells
  const createTextElement = (text) => {
    const paragraph = document.createElement('p');
    paragraph.textContent = text;
    return paragraph;
  };

  // Extract and validate content from the provided HTML structure
  const navBrandImage = element.querySelector('.nav-brand picture img');
  
  const navSectionsLinks = Array.from(element.querySelectorAll('.nav-sections ul li a'));
  
  const navToolsButton = element.querySelector('.nav-tools .button-container a');

  // Check and handle edge cases for missing or empty elements
  const navBrandImageClone = navBrandImage ? navBrandImage.cloneNode(true) : createTextElement('Image not available');

  const column1Content = navSectionsLinks.length > 0
    ? navSectionsLinks.map((link) => createTextElement(`- ${link.textContent}`))
    : [createTextElement('No links available')];

  const navToolsButtonClone = navToolsButton ? navToolsButton.cloneNode(true) : createTextElement('Button not available');

  // Preparing structured content for the table
  const headerRow = ['Columns'];

  // Row 2: Navigation links and branding image
  const column1 = [
    ...column1Content,
    createTextElement('Live'),
  ];
  const column2 = [navBrandImageClone];

  // Row 3: Donate button and preview link
  const row3Column1 = [navToolsButtonClone];
  const row3Column2 = [createTextElement('Or you can just view the preview'), navToolsButtonClone];

  const cells = [
    headerRow,
    [column1, column2],
    [row3Column1, row3Column2],
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(block);
}