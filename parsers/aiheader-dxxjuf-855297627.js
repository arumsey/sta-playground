
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with one row and one column
  let table = [[]];

  // Use the :scope pseudo-class to query only the children of the passed element
  let children = element.querySelectorAll(':scope > *');

  // Iterate over the child elements and add them to the first cell of the array
  children.forEach(child => {
    // If there are multiple elements to be placed in the same cell,
    // they should be added to an array first
    if (table[0][0]) {
      // If the first cell is not an array yet, convert it into an array
      if (!Array.isArray(table[0][0])) {
        table[0][0] = [table[0][0]];
      }
      // Add the current child to the array in the first cell
      table[0][0].push(child);
    } else {
      // If the first cell is empty, simply assign the current child to it
      table[0][0] = child;
    }
  });

  // Return the two-dimensional array
  return table;
}
