/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ["Columns"];

  // Extracting content from the provided HTML structure
  const savingsText1 = document.createElement("p");
  savingsText1.textContent = element.querySelector("#expected-savings-text")?.textContent || "";

  const savingsText2 = document.createElement("p");
  savingsText2.textContent = element.querySelector("#expected-savings-text-monthly")?.textContent || "";

  const pensionFund = document.createElement("strong");
  pensionFund.textContent = element.querySelector("#pension-fund")?.textContent || "";

  const currencySpan = document.createElement("span");
  currencySpan.textContent = element.querySelector(".pension-fund-currency")?.textContent || "";

  const riskProfileText = document.createElement("p");
  riskProfileText.textContent = element.querySelector(".risk-profile-text-container[id*='risk-profile-text-b'] .risk-profile-text")?.textContent || "";

  const canvasChart = element.querySelector("#yield-chart");

  // Constructing table rows
  const cells = [
    headerRow,
    [
      [savingsText1, savingsText2, pensionFund, currencySpan, riskProfileText], 
      canvasChart
    ]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}