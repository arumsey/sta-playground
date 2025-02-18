
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with 2 rows and 2 columns
  const table = [[], []];

  // Convert the XPaths to generic CSS selectors relative to the passed element
  // and find the elements using querySelector or querySelectorAll
  const selectors = [
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3)"
  ];

  // Find elements and place them in the two-dimensional array
  selectors.forEach((selector, index) => {
    const foundElements = element.querySelectorAll(selector);
    const row = Math.floor(index / 2);
    const col = index % 2;

    // If multiple elements should be placed in the same cell, create an array
    if (foundElements.length > 1) {
      table[row][col] = Array.from(foundElements);
    } else if (foundElements.length === 1) {
      table[row][col] = foundElements[0];
    }
  });

  return table;
}
