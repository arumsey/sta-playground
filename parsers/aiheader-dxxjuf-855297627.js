
export default function parse(element, { document }) {
  // Initialize the two-dimensional array with one row and one column
  let table = [[]];

  // Use the :scope pseudo-class to query only the children of the passed element
  let children = element.querySelectorAll(':scope > *');

  // Iterate over the child elements and add them to the first cell of the array
  children.forEach(child => {
    table[0].push(child);
  });

  // Return the two-dimensional array
  return table;
}
