/* global WebImporter */
 export default function parse(element, { document }) {
   const headerRow = ['Hero'];

   // Extract Image
   const imageElement = element.querySelector('img');
   let image = null;
   if (imageElement) {
     image = document.createElement('img');
     image.src = imageElement.src;
     image.alt = imageElement.alt || '';
   }

   // Extract Heading
   const headingElement = element.querySelector('h1') || element.querySelector('strong');
   let heading = null;
   if (headingElement) {
     heading = document.createElement('h1');
     heading.textContent = headingElement.textContent.trim();
   }

   // Create Table
   const cells = [
     headerRow,
     [
       image,
       heading,
     ].filter(Boolean),
   ];

   // Create block table and replace original element
   const blockTable = WebImporter.DOMUtils.createTable(cells, document);
   element.parentNode.replaceChild(blockTable, element);
 }