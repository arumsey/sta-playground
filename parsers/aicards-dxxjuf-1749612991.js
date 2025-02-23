
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with 2 rows and 2 columns
  let table = [[null, null], [null, null]];

  // Convert the given XPaths to CSS selectors relative to the provided element
  // The XPaths provided are:
  // /html[1]/body[1]/div[3]/nav[1]/div[1]
  // /html[1]/body[1]/div[3]/nav[2]/div[1]
  // Assuming that the element passed to the function corresponds to the main content area
  // which is /html[1]/body[1]/div[3]/main[1], we can use the following relative CSS selectors:
  let selectors = [
    ":scope > nav:nth-of-type(1) > div:first-child",
    ":scope > nav:nth-of-type(2) > div:first-child"
  ];

  // Find elements using the CSS selectors and add them to the table
  selectors.forEach((selector, index) => {
    let foundElements = element.querySelectorAll(selector);
    if (foundElements.length > 0) {
      // Calculate the row and column based on the index
      let row = Math.floor(index / 2);
      let col = index % 2;
      // If multiple elements should be placed in the same cell, wrap them in an array
      table[row][col] = foundElements.length === 1 ? foundElements[0] : Array.from(foundElements);
    }
  });

  // Return the two-dimensional array
  return table;
}
