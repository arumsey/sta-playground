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
/* eslint-disable no-console */
import columns5Parser from './parsers/columns5.js';
import columns10Parser from './parsers/columns10.js';
import columns3Parser from './parsers/columns3.js';
import embedVideo13Parser from './parsers/embedVideo13.js';
import hero2Parser from './parsers/hero2.js';
import columnsThreeColumns11Parser from './parsers/columnsThreeColumns11.js';
import hero7Parser from './parsers/hero7.js';
import columns16Parser from './parsers/columns16.js';
import columnsThreeColumns20Parser from './parsers/columnsThreeColumns20.js';
import hero19Parser from './parsers/hero19.js';
import carousel15Parser from './parsers/carousel15.js';
import columns21Parser from './parsers/columns21.js';
import columnsThreeColumns18Parser from './parsers/columnsThreeColumns18.js';
import carousel24Parser from './parsers/carousel24.js';
import columns14Parser from './parsers/columns14.js';
import cards4Parser from './parsers/cards4.js';
import columns12Parser from './parsers/columns12.js';
import columns26Parser from './parsers/columns26.js';
import columns23Parser from './parsers/columns23.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import {
  generateDocumentPath,
  handleOnLoad,
  postTransformRules,
  preTransformRules,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns5: columns5Parser,
  columns10: columns10Parser,
  columns3: columns3Parser,
  embedVideo13: embedVideo13Parser,
  hero2: hero2Parser,
  columnsThreeColumns11: columnsThreeColumns11Parser,
  hero7: hero7Parser,
  columns16: columns16Parser,
  columnsThreeColumns20: columnsThreeColumns20Parser,
  hero19: hero19Parser,
  carousel15: carousel15Parser,
  columns21: columns21Parser,
  columnsThreeColumns18: columnsThreeColumns18Parser,
  carousel24: carousel24Parser,
  columns14: columns14Parser,
  cards4: cards4Parser,
  columns12: columns12Parser,
  columns26: columns26Parser,
  columns23: columns23Parser,
};

WebImporter.Import = {
  getParserName: ({ name, cluster }) => {
    // Remove invalid filename characters
    let sanitizedString = name.replace(/[^a-zA-Z0-9-_\s]/g, ' ').trim();
    // Remove all numbers at the beginning of the string
    sanitizedString = sanitizedString.replace(/^\d+/, '');
    // Convert to camel case
    sanitizedString = sanitizedString
      .replace(/[\s-_]+(.)?/g, (match, chr) => (chr ? chr.toUpperCase() : ''))
      .replace(/^\w/, (c) => c.toLowerCase());
    return cluster ? `${sanitizedString}${cluster}` : sanitizedString;
  },
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (fragments = [], url = '') => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => instance.url === url)
    .map(({ xpath }) => xpath)),
};

const pageElements = [
  {
    name: 'metadata',
  },
];

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { fragments = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(fragments, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .map((block) => {
      const foundInstance = block.instances.find((instance) => instance.url === originalURL);
      if (foundInstance) {
        block.element = WebImporter.Import.getElementByXPath(document, foundInstance.xpath);
      }
      return block;
    })
    .filter((block) => block.element);

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // transform all block elements using parsers
  [...pageElements, ...blockElements].forEach(({ name, cluster, element = main }) => {
    const parserName = WebImporter.Import.getParserName({ name, cluster });
    const parserFn = parsers[parserName];
    if (!parserFn) return;
    // parse the element
    try {
      parserFn.call(this, element, { ...source });
    } catch (e) {
      console.warn(`Failed to parse block: ${name} from cluster: ${cluster}`, e);
    }
  });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter(({ url }) => `${url}#${fragment.name}` === originalURL)
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(
            ({ instances }) => instances
              .find(({ url, xpath: blockXpath }) => `${url}#${fragment.name}` === originalURL && blockXpath === xpath),
          );

        if (!fragmentBlock) return;
        const { name, cluster } = fragmentBlock;
        const parserName = WebImporter.Import.getParserName({ name, cluster });
        const parserFn = parsers[parserName];
        if (!parserFn) return;

        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${name} from cluster: ${cluster} with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, url, params: { originalURL } } = source;

    // sanitize the original URL
    /* eslint-disable no-param-reassign */
    source.params.originalURL = new URL(originalURL).href;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      // fetch the inventory
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        const inventoryResp = await fetch(inventoryUrl.href);
        inventory = await inventoryResp.json();
      } catch (e) {
        console.error('Failed to fetch inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // pre-transform rules
    preTransformRules({
      root: main,
      document,
      url,
      publishUrl,
      originalURL,
    });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source);
    }

    // post transform rules
    postTransformRules({
      root: main,
      document,
      originalURL,
    });

    return [{
      element: main,
      path,
    }];
  },
};
