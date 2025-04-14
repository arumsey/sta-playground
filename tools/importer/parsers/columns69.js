/* global WebImporter */
export default function parse(element, { document }) {
    const headerRow = ['Columns'];

    // Extract main text and subtext dynamically
    const mainText = element.querySelector('#expected-savings-text');
    const title = document.createElement('strong');
    title.textContent = mainText ? mainText.textContent.trim() : '';

    const subText = element.querySelector('#expected-savings-text-monthly');
    const subtitle = document.createElement('p');
    subtitle.textContent = subText ? subText.textContent.trim() : '';

    // Extract calculated value and currency dynamically
    const fundElement = element.querySelector('#pension-fund');
    const value = document.createElement('h1');
    value.textContent = fundElement ? fundElement.textContent.trim() : '';

    const currencyElement = element.querySelector('.pension-fund-currency');
    const currency = document.createElement('span');
    currency.textContent = currencyElement ? currencyElement.textContent.trim() : '';

    // Combine value and currency, avoid creating if elements are missing
    const valueBlock = document.createElement('div');
    if (value.textContent || currency.textContent) {
        valueBlock.appendChild(value);
        valueBlock.appendChild(currency);
    }

    // Extract risk profile, handle multiple profiles
    const riskProfileContainer = element.querySelector('.risk-profile-text-container[style*="display: block"]');
    const riskProfileText = riskProfileContainer?.querySelector('.risk-profile-text');
    const riskProfile = document.createElement('p');
    riskProfile.textContent = riskProfileText ? riskProfileText.textContent.trim() : '';

    // Extract chart dynamically
    const chartElement = element.querySelector('#yield-chart');

    const tableCells = [
        headerRow, // Block header
        [title, subtitle], // First data row
        [valueBlock, riskProfile], // Second data row
        chartElement ? [chartElement] : [] // Third row for chart (if present)
    ]
    .filter(row => row.length > 0); // Filter out empty rows

    const table = WebImporter.DOMUtils.createTable(tableCells, document);
    element.replaceWith(table);
}