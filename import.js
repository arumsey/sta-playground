/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
 
/* global WebImporter */
/* eslint-disable no-console, class-methods-use-this */

import importRules from './import-rules.js';
import metadataParser from './parsers/metadata.js';
import aidefaultContentParser from './parsers/aidefaultContent.js';
import aiheaderParser from './parsers/aiheader.js';
import aicolumnsParser from './parsers/aicolumns.js';

/**
 * Custom parser functions for each block type.
 *
 * Each parser function will be passed a root HTML element and
 * is expected to return a 2-dimensional array or an object of name/value
 * pairs that will be used to construct each block.
 */
const parsers = {
  metadata: metadataParser,
  aidefaultContent: aidefaultContentParser,
  aiheader: aiheaderParser,
  aicolumns: aicolumnsParser,
};

/**
 * Transformation functions against main content.
 */
const transformers = {
};

function isEmpty(cells) {
  if (Array.isArray(cells)) {
    return cells.length === 0;
  } if (typeof cells === 'object' && cells !== null) {
    return Object.keys(cells).length === 0;
  }
  return false;
}

/**
 * Return a path that describes the document being transformed (file name, nesting...).
 * The path is then used to create the corresponding Word document.
 * @param {String} url The url of the document being transformed.
 * @param {HTMLDocument} document The document
 */
function generateDocumentPath({ url }) {
  let p = new URL(url).pathname;
  if (p.endsWith('/')) {
    p = `${p}index`;
  }
  p = decodeURIComponent(p)
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/[^a-z0-9/]/gm, '-');
  return WebImporter.FileUtils.sanitizePath(p);
}

function computeScriptName(block) {
  return block.replace(/-./g, (match) => match.charAt(1).toUpperCase());
}

export default {
  /**
   * Apply DOM operations to the provided document and return
   * the root element to be then transformed to Markdown.
   * @param {HTMLDocument} document The document
   * @param {string} url The url of the page imported
   * @param {string} html The raw html (the document is cleaned up during preprocessing)
   * @param {object} params Object containing some parameters given by the import process.
   * @returns {HTMLElement} The root element to be transformed
   */
  transform: (source) => {
    // eslint-disable-next-line no-unused-vars 
    const { document, url, html, params } = source;

    const {
      root = 'main',
      cleanup: {
        start: removeStart = [],
        end: removeEnd = [],
      },
      blocks = [],
    } = importRules;
    
    // define the main element: the one that will be transformed to Markdown
    const main = document.querySelector(root) || document.body;
    
    // attempt to remove non-content elements
    WebImporter.DOMUtils.remove(main, removeStart);
    
    // transform all blocks using cell parsers
    blocks.forEach((blockCfg) => {
      const {
        type, variants, selectors = [], insertMode = 'replace',
      } = blockCfg;
      const parserFn = parsers[computeScriptName(type)];
      const elements = selectors.length
        ? selectors.reduce((acc, selector) => [...acc, ...main.querySelectorAll(selector)], [])
        : [main];
      // process every element for this block
      elements.forEach((element) => {
        // parse the element into block items
        let items = parserFn ? parserFn.call(this, element, { ...source }) : [];
        if (Array.isArray(items)) {
          items = items.filter((item) => item);
        }
        if (!isEmpty(items)) {
          // create the block
          const block = WebImporter.Blocks.createBlock(document, {
            name: WebImporter.Blocks.computeBlockName(type),
            variants,
            cells: items,
          });
          if (block) {
            // add block to DOM
            if (insertMode === 'append') {
              main.append(block);
            } else if (insertMode === 'prepend') {
              main.prepend(block);
            } else if (element !== main) {
              element.replaceWith(block);
            }
          }
        }
      });
    });
    
    // perform any additional transformations
    Object.values(transformers).forEach((transformerFn) => transformerFn.call(this, main, { ...source }));
    
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
    WebImporter.rules.convertIcons(main, document);
    
    // attempt to remove non-content elements
    WebImporter.DOMUtils.remove(main, removeEnd);

    return [{
      element: main,
      path: generateDocumentPath(source),
    }];
  },
};
