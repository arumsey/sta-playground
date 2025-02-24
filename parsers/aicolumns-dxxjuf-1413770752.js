
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with one row and three columns
  const table = [[]];

  // Use relative CSS selectors based on the provided xpaths and the element variable
  const selectors = [
    ":scope > div:nth-of-type(1)",
    ":scope > div:nth-of-type(2)",
    ":scope > div:nth-of-type(3)"
  ];

  // Iterate over the selectors to find the corresponding elements
  selectors.forEach((selector, index) => {
    const foundElements = element.querySelectorAll(selector);
    // If elements are found, add them to the corresponding cell in the array
    if (foundElements.length > 0) {
      // If multiple elements should be in the same cell, wrap them in an array
      const cellContent = foundElements.length === 1 ? foundElements[0] : Array.from(foundElements);
      table[0][index] = cellContent;
    } else {
      // If no element is found, add null to the cell
      table[0][index] = null;
    }
  });

  return table;
}
