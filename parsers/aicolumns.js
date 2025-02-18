
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with 2 rows and 2 columns
  const table = [[], []];

  // Convert the XPaths to CSS selectors relative to the provided element
  // and use querySelector or querySelectorAll to find the elements
  const selectors = [
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1) > div:nth-of-type(1)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(2)",
    ":scope > div:nth-of-type(2) > div:nth-of-type(1) > div:nth-of-type(3)"
  ];

  // Find elements and place them in the two-dimensional array
  selectors.forEach((selector, index) => {
    const elements = Array.from(element.querySelectorAll(selector));
    const row = Math.floor(index / 2);
    const col = index % 2;

    if (table[row][col]) {
      // If the cell already has an element, create a new array and add both
      table[row][col] = [table[row][col]].concat(elements);
    } else {
      // If the cell is empty, add the element or array of elements
      table[row][col] = elements.length > 1 ? elements : elements[0];
    }
  });

  return table;
}
