
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with empty rows
  const table = [[], []];

  // Convert the XPaths to generic CSS selectors relative to the element
  const selectors = [
    ":scope > nav:nth-of-type(1) > div:nth-of-type(1)",
    ":scope > nav:nth-of-type(2) > div:nth-of-type(1)"
  ];

  // Find elements using the CSS selectors and add them to the table
  selectors.forEach((selector, index) => {
    const foundElements = element.querySelectorAll(selector);
    const row = Math.floor(index / 2); // Calculate the row index (0 or 1)
    const col = index % 2; // Calculate the column index (0 or 1)

    // If multiple elements are found for the same cell, wrap them in an array
    if (foundElements.length > 1) {
      table[row][col] = Array.from(foundElements);
    } else {
      table[row][col] = foundElements[0] || null; // Add the single element or null if not found
    }
  });

  return table;
}
