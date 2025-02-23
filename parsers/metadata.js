/* global WebImporter */

function isDate(str) {
    if (typeof str !== 'string') return false;
    const date = new Date(str);
    return !Number.isNaN(Number(date));
}

/**
* Parse the document for metadata cell values.
*
* @param {HTMLElement} element The root query element.
* @param {Object} props Additional parse function props.
*/
export default function parse(element, props) {
  const { document } = props;
  const baseMetadata = WebImporter.Blocks.getMetadata(document) || {};
  const customMetadata = {};
  const meta = { ...baseMetadata, ...customMetadata };
  Object.entries(meta).forEach(([key, value]) => {
    // use first image
    if (key === 'Image') {
      const [img1] = value.src.split(',');
      value.src = img1;
    }
    // convert dates
    if (isDate(value)) {
      meta[key] = new Date(value).toISOString().slice(0, 10);
    }
  });
  return meta;
}
