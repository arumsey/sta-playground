/* global WebImporter */
export default function parse(element, { document }) {
  const createTable = WebImporter.DOMUtils.createTable;

  // Table header row
  const headerRow = ['Columns'];

  // First slider: Extracting age-related content dynamically
  const ageTitleElement = element.querySelector('.slider-container:first-child .slider-content.slider-title h5');
  const ageValueElement = element.querySelector('.slider-container:first-child .slider-content.slider-value h3');
  const ageTitle = ageTitleElement ? ageTitleElement.textContent.trim() : '';
  const ageValue = ageValueElement ? ageValueElement.textContent.trim() : '';

  // Ensuring age section dynamically uses extracted values
  const ageSection = [
    ageTitle,
    ageValue
  ];

  // Second slider: Deposit amount-related content dynamically
  const depositTitleElement = element.querySelector('.slider-container:last-child .slider-content.slider-title h5');
  const depositValueElement = element.querySelector('.slider-container:last-child .slider-content.slider-value h3');
  const depositCurrencyElement = element.querySelector('.slider-container:last-child .slider-content.slider-value .slider-value-currency');
  const depositTitle = depositTitleElement ? depositTitleElement.textContent.trim() : '';
  const depositValue = depositValueElement ? depositValueElement.textContent.trim() : '';
  const depositCurrency = depositCurrencyElement ? depositCurrencyElement.textContent.trim() : '';

  // Combining values in deposit section
  const depositSection = [
    depositTitle,
    `${depositValue} ${depositCurrency}`.trim()
  ];

  // Constructing the table array
  const cells = [
    headerRow,
    ageSection,
    depositSection
  ];

  // Creating the table and replacing the original element
  const block = createTable(cells, document);
  element.replaceWith(block);
}